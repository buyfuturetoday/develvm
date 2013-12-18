
---
layout: post
title: Jython
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]] > [[IT resources]]

== Installation ==

See CentOS.


== Distribute jython programs ==

* http://wiki.python.org/jython/JythonFaq/DistributingJythonScripts


== Simple first program ==

<pre>
/Users/Jonas/jython

import javax.swing as swing
win = swing.JFrame("Welcome to Jython")
win
win.size = (200, 200)
win.size
win.show(  )
</pre>


== Parser generator ==

Long list:
* http://wiki.python.org/moin/LanguageParsing
* http://www.python.org/community/sigs/retired/parser-sig/towards-standard/

This one looks good, will test it:
* https://bitbucket.org/namenlos/yeanpypa - is inspired by boost::spirit

=== Yeanpypa ===

NO MEANINGFUL ERROR CODES

* http://www.slash-me.net/dev/snippets/yeanpypa/documentation.html
* http://www.slash-me.net/dev/snippets/yeanpypa/

<pre>
cd
cd src/jython
hg clone https://bitbucket.org/namenlos/yeanpypa

export JYTHONPATH=./yeanpypa


vi tpars1.py
from yeanpypa import *

digit     = Literal('1') | Literal('2') | Literal('3') | Literal('4') | \
            Literal('5') | Literal('6') | Literal('7') | Literal('8') | \
            Literal('9') | Literal('0')
number    = Word(digit)
float_num = Optional(number) + Literal('.') + number
result = parse(float_num, '123.123')
if result.full():
    print result.getTokens()
else:
    print 'The parser did not consume all input.'

</pre>


Test #2
<pre>
export JYTHONPATH=./yeanpypa
jython

from yeanpypa import *

number    = Word(digit)
float_num = Optional(number) + Literal('.').hide() + number

result = parse(float_num, '123.123')
if result.full():
    print result.getTokens()
else:
    print 'The parser did not consume all input.'
</pre>


Do something meaningful
<pre>
number    = Word(digit).setAction(lambda x: int(x[0]))
float_num = Optional(number) + Literal('.').hide() + number

result = parse(float_num, '123.123')
if result.full():
    print result.getTokens()
else:
    print 'The parser did not consume all input.'
</pre>


=== PLY - Lex-Yacc for Python ===

* http://www.dabeaz.com/ply/


<pre>
cd 
cd src/jython

jython

import ply.lex as lex
import ply.yacc as yacc

# -----------------------------------------------------------------------------
# calc.py
#
# A simple calculator with variables.
# -----------------------------------------------------------------------------

tokens = (
    'NAME','NUMBER',
    'PLUS','MINUS','TIMES','DIVIDE','EQUALS',
    'LPAREN','RPAREN',
    )

# Tokens

t_PLUS    = r'\+'
t_MINUS   = r'-'
t_TIMES   = r'\*'
t_DIVIDE  = r'/'
t_EQUALS  = r'='
t_LPAREN  = r'\('
t_RPAREN  = r'\)'
t_NAME    = r'[a-zA-Z_][a-zA-Z0-9_]*'

def t_NUMBER(t):
    r'\d+'
    t.value = int(t.value)
    return t

# Ignored characters
t_ignore = " \t"

def t_newline(t):
    r'\n+'
    t.lexer.lineno += t.value.count("\n")

def t_error(t):
    print("Illegal character '%s'" % t.value[0])
    t.lexer.skip(1)
    
# Build the lexer
import ply.lex as lex
lex.lex()

# Precedence rules for the arithmetic operators
precedence = (
    ('left','PLUS','MINUS'),
    ('left','TIMES','DIVIDE'),
    ('right','UMINUS'),
    )

# dictionary of names (for storing variables)
names = { }

def p_statement_assign(p):
    'statement : NAME EQUALS expression'
    names[p[1]] = p[3]

def p_statement_expr(p):
    'statement : expression'
    print(p[1])

def p_expression_binop(p):
    '''expression : expression PLUS expression
                  | expression MINUS expression
                  | expression TIMES expression
                  | expression DIVIDE expression'''
    if p[2] == '+'  : p[0] = p[1] + p[3]
    elif p[2] == '-': p[0] = p[1] - p[3]
    elif p[2] == '*': p[0] = p[1] * p[3]
    elif p[2] == '/': p[0] = p[1] / p[3]

def p_expression_uminus(p):
    'expression : MINUS expression %prec UMINUS'
    p[0] = -p[2]

def p_expression_group(p):
    'expression : LPAREN expression RPAREN'
    p[0] = p[2]

def p_expression_number(p):
    'expression : NUMBER'
    p[0] = p[1]

def p_expression_name(p):
    'expression : NAME'
    try:
        p[0] = names[p[1]]
    except LookupError:
        print("Undefined name '%s'" % p[1])
        p[0] = 0

def p_error(p):
    print("Syntax error at '%s'" % p.value)

import ply.yacc as yacc
yacc.yacc()

while 1:
    try:
        s = raw_input('calc > ')   # use input() on Python 3
    except EOFError:
        break
    yacc.parse(s)



</pre>

== YAPPS ==

* http://theory.stanford.edu/~amitp/yapps/
