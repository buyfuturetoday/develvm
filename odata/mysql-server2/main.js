// main.js
//------------------------------
//
// 2014-08-11, Jonas Colmsjö
//
//------------------------------
//
// Simple OData server on top of MySQL.
//
// use like this:
//
//  >npm install
//  >node
//  >var s = require('./main.js');
//  >s.start();
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------

(function (self, undefined) {
    
    var mos    = self.mysqlodata || {};


    var u = require('underscore');

    // Default no of rows to return
    var defaultRowCount = 100;
    var defaultPort     = 8081;

    //
    // Translate OData filter to SQL where expression
    // ==============================================
    //
    // http://www.odata.org/documentation/odata-version-2-0/uri-conventions
    //
    // |Operator    |Description     |Example
    // |------------|----------------|------------------------------------------------|
    // |Logical Operators|           |                                                |
    // |Eq          |Equal           |/Suppliers?$filter=Address/City eq ‘Redmond’    |
    // |Ne          |Not equal       |/Suppliers?$filter=Address/City ne ‘London’     |
    // |Gt          |Greater than    |/Products?$filter=Price gt 20                   |
    // |Ge          |Greater than or equal|/Products?$filter=Price ge 10              |
    // |Lt          |Less than       |/Products?$filter=Price lt 20                   |
    // |Le          |Less than or equal|/Products?$filter=Price le 100                |
    // |And         |Logical and     |/Products?$filter=Price le 200 and Price gt 3.5 |
    // |Or          |Logical or      |/Products?$filter=Price le 3.5 or Price gt 200  |
    // |Not         |Logical negation|/Products?$filter=not endswith(Description,’milk’)|
    // |Arithmetic Operators|        |                                               |
    // |Add         |Addition        |/Products?$filter=Price add 5 gt 10            |
    // |Sub         |Subtraction     |/Products?$filter=Price sub 5 gt 10            |
    // |Mul         |Multiplication  |/Products?$filter=Price mul 2 gt 2000          |
    // |Div         |Division        |/Products?$filter=Price div 2 gt 4             |
    // |Mod         |Modulo          |/Products?$filter=Price mod 2 eq 0             |
    // |Grouping Operators|          |                                               |
    // [( )         |Precedence grouping|/Products?$filter=(Price sub 5) gt 10        |
    //
    //
    // http://dev.mysql.com/doc/refman/5.7/en/expressions.html
    //
    // expr:
    //    expr OR expr
    //  | expr || expr
    //  | expr XOR expr
    //  | expr AND expr
    //  | expr && expr
    //  | NOT expr
    //  | ! expr
    //  | boolean_primary IS [NOT] {TRUE | FALSE | UNKNOWN}
    //  | boolean_primary
    //
    // boolean_primary:
    //   boolean_primary IS [NOT] NULL
    //  | boolean_primary <=> predicate
    //  | boolean_primary comparison_operator predicate
    //  | boolean_primary comparison_operator {ALL | ANY} (subquery)
    //  | predicate
    //
    // comparison_operator: = | >= | > | <= | < | <> | !=

    // translate Odata filter operators to sql operators
    // string not matched are just returned
    var translateOp = function(s) {

        // the supported operators
        var op = [];
        op['eq']  = '=';
        op['ne']  = '<>';
        op['gt']  = '>';
        op['ge']  = '>=';
        op['lt']  = '<';
        op['le']  = '<=';
        op['and'] = 'and';
        op['or']  = 'or';
        op['not'] = 'not';
        op['add'] = '+';
        op['sub'] = '-';
        op['mul'] = '*';
        op['div'] = '/';
        op['mod'] = 'mod';

        return (op[s.toLowerCase()] !== undefined) ? op[s.toLowerCase()] : s;
    }

    // take a string with a filter expresssion and translate into a SQL expression
    var filter2where = function(expr) {

        // check for functions and groupings. These are not supported.
        if(expr.indexOf('(') > -1) {
            throw new Error('Functions and groupings are not supported: '+expr);
        }

        // remove multiple spaces
        expr = expr.replace(/\s{2,}/g, ' ');

        // create array of tokens
        expr = expr.split(' ');

        // translate operators and create a string
        return u.map(expr,translateOp).join(' ');
    }


    //
    // Parse Query strings
    // ===================
    //
    // Supported:
    //
    // * $orderby= col[ asc|desc] - SQL: order by
    // * $filter=... - SQL: where clause
    // * $skip=N - $orderby must supplied for the result to be reliable
    // * $select=col,col - columns in the select
    //
    // Not supported:
    //
    // * $top
    // * $inlinecount
    // * $expand
    // * $format - use http header
    //
    //
    // MySQL Reference
    // ---------------
    //
    // http://dev.mysql.com/doc/refman/5.7/en/select.html
    //
    // 1.SELECT
    //     [ALL | DISTINCT | DISTINCTROW ]
    //       [HIGH_PRIORITY]
    //       [MAX_STATEMENT_TIME]
    //       [STRAIGHT_JOIN]
    //       [SQL_SMALL_RESULT] [SQL_BIG_RESULT] [SQL_BUFFER_RESULT]
    //       [SQL_CACHE | SQL_NO_CACHE] [SQL_CALC_FOUND_ROWS]
    //     select_expr [, select_expr ...]
    // 2.  [FROM table_references
    //       [PARTITION partition_list]
    // 3.  [WHERE where_condition]
    // 4.  [GROUP BY {col_name | expr | position}
    //       [ASC | DESC], ... [WITH ROLLUP]]
    // 5.  [HAVING where_condition]
    // 6.  [ORDER BY {col_name | expr | position}
    //       [ASC | DESC], ...]
    // 7.  [LIMIT {[offset,] row_count | row_count OFFSET offset}]
    // 8.  [PROCEDURE procedure_name(argument_list)]
    // 9.  [INTO OUTFILE 'file_name'
    //         [CHARACTER SET charset_name]
    //         export_options
    //       | INTO DUMPFILE 'file_name'
    //       | INTO var_name [, var_name]]
    //     [FOR UPDATE | LOCK IN SHARE MODE]]

    var odata2sql = function (param, key) {
        switch(key)
        {
            case '$orderby':
                return {id:6, q:' order by '+param};
                break;

            case '$filter':
                return {id:3, q:' where '+filter2where(param)};
                break;

            case '$skip':
                return {id:7, q:' limit '+param+','+defaultRowCount};
                break;

            case '$select':
                return {id:1, q:'select '+param};
                break;

            case '$top':
                throw Error('Unsupported query: '+key);
                break;

            case '$inlinecount':
                throw Error('Unsupported query: '+key);
                break;

            case '$expand':
                throw Error('Unsupported query: '+key);
                break;

            case '$format':
                throw Error('Use http header to select format!');
                break;

            default:
                throw Error('Invalid query: '+key);
        }
    }


    //
    // Parse OData URI
    // ===============

    mos.parseQuery = function(s) {
        var url       = require('url');
        var parsedURL = url.parse(s,true,false);

        // translate odata queries in URI to sql
        var sqlObjects = u.map(parsedURL.query, odata2sql);

        // get the schema and table name
        var a      = parsedURL.pathname.split("/");
        if(a.length != 3) {
            throw new Error('Pathname should be in the form /schema/table, not '+parsedURL.pathname);
        }
        var schema = a[1];
        if(a[2].indexOf('(') > -1) {
            throw new Error('The form /schema/entity(key) is not supported. Use $filter instead.');
        }
        sqlObjects.push({id:2, q:' from '+a[2]});

        // sort the query objects according to the sql specification
        sqlObjects = u.sortBy(sqlObjects, function(o) {return o.id;});

        // add select * if there is no $select
        if(sqlObjects[0].id != 1) {
            sqlObjects.push({id:1, q:'select *'});
            // sort the query objects according to the sql specification
            sqlObjects = u.sortBy(sqlObjects, function(o) {return o.id;});
        }

        // create a string from the objects
        var sqlString = u.reduce(
            sqlObjects, 
            function(memo,o) {
                return memo+o.q;
            }, 
            "");

        return {schema:schema, sql:sqlString};

    }

    mos.start = function () {
        var http = require("http");

        var server = http.createServer(function(request, response) {

                try {
                    var mysql      = require('mysql');
                    var connection = mysql.createConnection({
                      host     : 'localhost',
                      user     : 'me',
                      password : 'secret'
                    });

                    connection.connect();

                    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
                      if (err) throw err;

                      console.log('The solution is: ', rows[0].solution);
                    });

                    connection.end();


                    
                    var sql = mos.parseQuery(request.url);

                    console.log(sql);

                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.write('res: '+JSON.stringify(sql));
                    response.end();
                } catch(e) {

                    // Should return 406 when failing
                    // http://www.odata.org/documentation/odata-version-2-0/operations/
                    response.writeHead(406, {"Content-Type": "application/json"});
                    response.write(e.toString());
                    response.end();
                }
            });

            server.listen(defaultPort);
            console.log("Server is listening");

    }


    // Exports
    // =======

    module.exports = mos;

})(this);