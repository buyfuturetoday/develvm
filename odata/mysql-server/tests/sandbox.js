// sandbox.js
//------------------------------
//
// 2014-08-02, Jonas Colmsjö
//
//------------------------------
//
// Playground for figuring out howto use the datajs library. Most of the code has been taken from datajs tests.
//
// Use like this: ./node_modules/.bin/qunit -t tests/test1.js -c main2.js
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------


// Helpers
// =================


var pd = require('pretty-data').pd;
var logJSON = function(h, s) { console.log(h+":\n"+JSON.stringify(s,0,2)); };
var logXML = function(h, x) { console.log(h+":\n"+pd.xml(x)); };


// From datajs/tests
// =================

// Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
// files (the "Software"), to deal  in the Software without restriction, including without limitation the rights  to use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// WARRANTIES OF MERCHANTABILITY,  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// odata-atom-tests.js

var parseMetadataHelper = function (text) {
        var response = { statusCode: 200, body: text, headers: { "Content-Type": "application/xml"} };
        OData.metadataHandler.read(response, {});
        return response.data;
};

var customerSampleMetadataText = '' +
'<edmx:Edmx Version="1.0" xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx">\r\n' +
'<edmx:DataServices xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" m:DataServiceVersion="2.0">\r\n' +
'<Schema Namespace="Ns" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns="http://schemas.microsoft.com/ado/2006/04/edm">\r\n' +
'    <EntityType Name="Customer">\r\n' +
'    <Key><PropertyRef Name="ID" /></Key>\r\n' +
'     <Property Name="ID" Type="Edm.Int32" Nullable="false" />\r\n' +
'     <Property Name="Name" Type="Edm.String" Nullable="true" m:FC_TargetPath="SyndicationSummary" m:FC_ContentKind="xhtml" m:FC_KeepInContent="false" />\r\n' +
'     <Property Name="LastName" Type="Edm.String" Nullable="true" m:FC_TargetPath="foo/bar/@baz" m:FC_NsUri="htp://prefix" m:FC_NsPrefix="prefix" m:FC_KeepInContent="false" />\r\n' +
'     <Property Name="FavoriteNumber" Type="Edm.Int32" Nullable="true" m:FC_TargetPath="favorite/number" m:FC_NsUri="htp://prefix" m:FC_NsPrefix="prefix" m:FC_KeepInContent="false" />\r\n' +
'     <Property Name="Address" Type="Ns.Address" Nullable="false" \r\n' +
'       m:FC_TargetPath="foo/bar/@city" m:FC_NsUri="htp://prefix" m:FC_NsPrefix="prefix" m:FC_SourcePath="City" m:FC_KeepInContent="false" \r\n' +
'       m:FC_TargetPath_1="foo/bar" m:FC_NsUri_1="htp://prefix" m:FC_NsPrefix_1="prefix" m:FC_SourcePath_1="Street" m:FC_KeepInContent_1="false" />\r\n' +
'    </EntityType>\r\n' +
'    <ComplexType Name="Address">\r\n' +
'     <Property Name="Street" Type="Edm.String" Nullable="true" />\r\n' +
'     <Property Name="City" Type="Edm.String" Nullable="true" />\r\n' +
'    </ComplexType>\r\n' +
'    <EntityContainer Name="SampleContext" m:IsDefaultEntityContainer="true">\r\n' +
'     <EntitySet Name="Customers" EntityType="Ns.Customer" />\r\n' +
'    </EntityContainer>\r\n' +
'</Schema>\r\n' +
'</edmx:DataServices></edmx:Edmx>';

var foodServiceV2FoodsSampleText = '' +
'<feed xml:base="http://localhost/tests/endpoints/FoodStoreDataServiceV2.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">' +
'  <title type="text">Foods</title>' +
'  <id>http://localhost/tests/endpoints/FoodStoreDataServiceV2.svc/Foods</id>' +
'  <updated>2010-12-28T23:09:54Z</updated>' +
'  <link rel="self" title="Foods" href="Foods" />' +
'  <entry>' +
'    <id>http://localhost/tests/endpoints/FoodStoreDataServiceV2.svc/Foods(0)</id>' +
'    <title type="text">flour</title>' +
'    <updated>2010-12-28T23:09:54Z</updated>' +
'    <author><name /></author>' +
'    <link rel="edit" title="Food" href="Foods(0)" />' +
'    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Foods(0)/Category" />' +
'    <category term="DataJS.Tests.V2.Food" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />' +
'    <content type="application/xml">' +
'      <m:properties>' +
'        <d:FoodID m:type="Edm.Int32">0</d:FoodID>' +
'        <d:Name>flour</d:Name>' +
'        <d:ServingSize m:type="Edm.Decimal">1</d:ServingSize>' +
'        <d:MeasurementUnit>Cup</d:MeasurementUnit>' +
'        <d:ProteinGrams m:type="Edm.Byte">3</d:ProteinGrams>' +
'        <d:FatGrams m:type="Edm.Int16">1</d:FatGrams>' +
'        <d:CarbohydrateGrams m:type="Edm.Int32">20</d:CarbohydrateGrams>' +
'        <d:CaloriesPerServing m:type="Edm.Int64">140</d:CaloriesPerServing>' +
'        <d:IsAvailable m:type="Edm.Boolean">true</d:IsAvailable>' +
'        <d:ExpirationDate m:type="Edm.DateTime">2010-12-25T12:00:00</d:ExpirationDate>' +
'        <d:ItemGUID m:type="Edm.Guid">27272727-2727-2727-2727-272727272727</d:ItemGUID>' +
'        <d:Weight m:type="Edm.Single">10</d:Weight>' +
'        <d:AvailableUnits m:type="Edm.SByte">1</d:AvailableUnits>' +
'        <d:Packaging m:type="DataJS.Tests.V2.Package">' +
'          <d:Type m:null="true" />' +
'          <d:Color></d:Color>' +
'          <d:NumberPerPackage m:type="Edm.Int32">2147483647</d:NumberPerPackage>' +
'          <d:RequiresRefridgeration m:type="Edm.Boolean">false</d:RequiresRefridgeration>' +
'          <d:ShipDate m:type="Edm.DateTime">0001-01-01T00:00:00</d:ShipDate>' +
'          <d:PackageDimensions m:type="DataJS.Tests.V2.Dimensions">' +
'            <d:Length m:type="Edm.Decimal">79228162514264337593543950335</d:Length>' +
'            <d:Height m:type="Edm.Int16">32767</d:Height>' +
'            <d:Width m:type="Edm.Int64">9223372036854775807</d:Width>' +
'            <d:Volume m:type="Edm.Double">1.7976931348623157E+308</d:Volume>' +
'          </d:PackageDimensions>' +
'        </d:Packaging>' +
'      </m:properties>' +
'    </content>' +
'    <cooked:cooked cooked:length="2" cooked:height="1" cooked:width="3" xmlns:cooked="http://www.example.org/cooked/">' +
'      <cooked:volume>6</cooked:volume>' +
'    </cooked:cooked>' +
'    <pr:price pr:value="0.19999" xmlns:pr="http://www.example.org/price/"></pr:price>' +
'  </entry>' +
'  <entry>' +
'    <id>http://localhost/tests/endpoints/FoodStoreDataServiceV2.svc/Foods(1)</id>' +
'    <title type="text">sugar</title>' +
'    <updated>2010-12-28T23:09:54Z</updated>' +
'    <author>' +
'      <name />' +
'    </author>' +
'    <link rel="edit" title="Food" href="Foods(1)" />' +
'    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Foods(1)/Category" />' +
'    <category term="DataJS.Tests.V2.Food" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />' +
'    <content type="application/xml">' +
'      <m:properties>' +
'        <d:FoodID m:type="Edm.Int32">1</d:FoodID>' +
'        <d:Name>sugar</d:Name>' +
'        <d:ServingSize m:type="Edm.Decimal">1</d:ServingSize>' +
'        <d:MeasurementUnit>tsp</d:MeasurementUnit>' +
'        <d:ProteinGrams m:type="Edm.Byte">0</d:ProteinGrams>' +
'        <d:FatGrams m:type="Edm.Int16">0</d:FatGrams>' +
'        <d:CarbohydrateGrams m:type="Edm.Int32">4</d:CarbohydrateGrams>' +
'        <d:CaloriesPerServing m:type="Edm.Int64">16</d:CaloriesPerServing>' +
'        <d:IsAvailable m:type="Edm.Boolean">false</d:IsAvailable>' +
'        <d:ExpirationDate m:type="Edm.DateTime">2011-12-28T00:00:00</d:ExpirationDate>' +
'        <d:ItemGUID m:type="Edm.Guid">ffffffff-ffff-ffff-ffff-ffffffffffff</d:ItemGUID>' +
'        <d:Weight m:type="Edm.Single">0.1</d:Weight>' +
'        <d:AvailableUnits m:type="Edm.SByte">0</d:AvailableUnits>' +
'        <d:Packaging m:type="DataJS.Tests.V2.Package">' +
'          <d:Type xml:space="preserve"> </d:Type>' +
'          <d:Color>BLUE</d:Color>' +
'          <d:NumberPerPackage m:type="Edm.Int32">-2147483648</d:NumberPerPackage>' +
'          <d:RequiresRefridgeration m:type="Edm.Boolean">true</d:RequiresRefridgeration>' +
'          <d:ShipDate m:type="Edm.DateTime">0001-01-01T00:00:00</d:ShipDate>' +
'          <d:PackageDimensions m:type="DataJS.Tests.V2.Dimensions">' +
'            <d:Length m:type="Edm.Decimal">-79228162514264337593543950335</d:Length>' +
'            <d:Height m:type="Edm.Int16">-32768</d:Height>' +
'            <d:Width m:type="Edm.Int64">-9223372036854775808</d:Width>' +
'            <d:Volume m:type="Edm.Double">-1.7976931348623157E+308</d:Volume>' +
'          </d:PackageDimensions>' +
'        </d:Packaging>' +
'        <d:CookedSize m:type="DataJS.Tests.V2.CookedDimensions" m:null="true" />' +
'      </m:properties>' +
'    </content>' +
'    <cooked:cooked cooked:length="" cooked:height="" cooked:width="" xmlns:cooked="http://www.example.org/cooked/">' +
'      <cooked:volume></cooked:volume>' +
'    </cooked:cooked>' +
'    <pr:price pr:value="0.2" xmlns:pr="http://www.example.org/price/"></pr:price>' +
'  </entry>' +
'</feed>';

var foodServiceV2MetadataText = '' +
'<edmx:Edmx Version="1.0" xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx">' +
'  <edmx:DataServices xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" m:DataServiceVersion="2.0">' +
'    <Schema Namespace="DataJS.Tests.V2" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns="http://schemas.microsoft.com/ado/2007/05/edm">' +
'      <EntityType Name="Category">' +
'        <Key>' +
'          <PropertyRef Name="CategoryID" />' +
'        </Key>' +
'        <Property Name="CategoryID" Type="Edm.Int32" Nullable="false" />' +
'        <Property Name="Name" Type="Edm.String" Nullable="true" m:FC_TargetPath="SyndicationTitle" m:FC_ContentKind="text" m:FC_KeepInContent="true" />' +
'        <NavigationProperty Name="Foods" Relationship="DataJS.Tests.V2.Category_Foods" FromRole="Category" ToRole="Foods" />' +
'      </EntityType>' +
'      <EntityType Name="PreparedFood" BaseType="DataJS.Tests.V2.Food">' +
'        <Property Name="Instructions" Type="Edm.String" Nullable="true" />' +
'        <Property Name="NumberOfIngredients" Type="Edm.Single" Nullable="false" />' +
'      </EntityType>' +
'      <EntityType Name="Food">' +
'        <Key>' +
'          <PropertyRef Name="FoodID" />' +
'        </Key>' +
'        <Property Name="FoodID" Type="Edm.Int32" Nullable="false" />' +
'        <Property Name="Name" Type="Edm.String" Nullable="true" m:FC_TargetPath="SyndicationTitle" m:FC_ContentKind="text" m:FC_KeepInContent="true" />' +
'        <Property Name="UnitPrice" Type="Edm.Double" Nullable="false" m:FC_TargetPath="price/@value" m:FC_NsUri="http://www.example.org/price/" m:FC_NsPrefix="pr" m:FC_KeepInContent="false" />' +
'        <Property Name="ServingSize" Type="Edm.Decimal" Nullable="false" />' +
'        <Property Name="MeasurementUnit" Type="Edm.String" Nullable="true" />' +
'        <Property Name="ProteinGrams" Type="Edm.Byte" Nullable="false" />' +
'        <Property Name="FatGrams" Type="Edm.Int16" Nullable="false" />' +
'        <Property Name="CarbohydrateGrams" Type="Edm.Int32" Nullable="false" />' +
'        <Property Name="CaloriesPerServing" Type="Edm.Int64" Nullable="false" />' +
'        <Property Name="IsAvailable" Type="Edm.Boolean" Nullable="false" />' +
'        <Property Name="ExpirationDate" Type="Edm.DateTime" Nullable="false" />' +
'        <Property Name="ItemGUID" Type="Edm.Guid" Nullable="false" />' +
'        <Property Name="Weight" Type="Edm.Single" Nullable="false" />' +
'        <Property Name="AvailableUnits" Type="Edm.SByte" Nullable="false" />' +
'        <Property Name="Packaging" Type="DataJS.Tests.V2.Package" Nullable="false" />' +
'        <Property Name="CookedSize" Type="DataJS.Tests.V2.CookedDimensions" Nullable="false" m:FC_TargetPath="cooked/volume" m:FC_NsUri="http://www.example.org/cooked/" m:FC_NsPrefix="cooked" m:FC_SourcePath="Volume" m:FC_KeepInContent="false" m:FC_TargetPath_1="cooked/@width" m:FC_NsUri_1="http://www.example.org/cooked/" m:FC_NsPrefix_1="cooked" m:FC_SourcePath_1="Width" m:FC_KeepInContent_1="false" m:FC_TargetPath_2="cooked/@height" m:FC_NsUri_2="http://www.example.org/cooked/" m:FC_NsPrefix_2="cooked" m:FC_SourcePath_2="Height" m:FC_KeepInContent_2="false" m:FC_TargetPath_3="cooked/@length" m:FC_NsUri_3="http://www.example.org/cooked/" m:FC_NsPrefix_3="cooked" m:FC_SourcePath_3="Length" m:FC_KeepInContent_3="false" />' +
'        <NavigationProperty Name="Category" Relationship="DataJS.Tests.V2.Food_Category" FromRole="Food" ToRole="Category" />' +
'      </EntityType>' +
'      <ComplexType Name="Package">' +
'        <Property Name="Type" Type="Edm.String" Nullable="true" />' +
'        <Property Name="Color" Type="Edm.String" Nullable="true" />' +
'        <Property Name="NumberPerPackage" Type="Edm.Int32" Nullable="false" />' +
'        <Property Name="RequiresRefridgeration" Type="Edm.Boolean" Nullable="false" />' +
'        <Property Name="ShipDate" Type="Edm.DateTime" Nullable="false" />' +
'        <Property Name="PackageDimensions" Type="DataJS.Tests.V2.Dimensions" Nullable="false" />' +
'      </ComplexType>' +
'      <ComplexType Name="Dimensions">' +
'        <Property Name="Length" Type="Edm.Decimal" Nullable="false" />' +
'        <Property Name="Height" Type="Edm.Int16" Nullable="false" />' +
'        <Property Name="Width" Type="Edm.Int64" Nullable="false" />' +
'        <Property Name="Volume" Type="Edm.Double" Nullable="false" />' +
'      </ComplexType>' +
'      <ComplexType Name="CookedDimensions">' +
'        <Property Name="Length" Type="Edm.Decimal" Nullable="false" />' +
'        <Property Name="Height" Type="Edm.Int16" Nullable="false" />' +
'        <Property Name="Width" Type="Edm.Int64" Nullable="false" />' +
'        <Property Name="Volume" Type="Edm.Double" Nullable="false" />' +
'      </ComplexType>' +
'      <Association Name="Category_Foods">' +
'        <End Role="Category" Type="DataJS.Tests.V2.Category" Multiplicity="*" />' +
'        <End Role="Foods" Type="DataJS.Tests.V2.Food" Multiplicity="*" />' +
'      </Association>' +
'      <Association Name="Food_Category">' +
'        <End Role="Food" Type="DataJS.Tests.V2.Food" Multiplicity="*" />' +
'        <End Role="Category" Type="DataJS.Tests.V2.Category" Multiplicity="0..1" />' +
'      </Association>' +
'      <EntityContainer Name="FoodContainer" m:IsDefaultEntityContainer="true">' +
'        <EntitySet Name="Categories" EntityType="DataJS.Tests.V2.Category" />' +
'        <EntitySet Name="Foods" EntityType="DataJS.Tests.V2.Food" />' +
'        <AssociationSet Name="Category_Foods" Association="DataJS.Tests.Category_Foods">' +
'          <End Role="Category" EntitySet="Categories" />' +
'          <End Role="Foods" EntitySet="Foods" />' +
'        </AssociationSet>' +
'        <AssociationSet Name="Food_Category" Association="DataJS.Tests.V2.Food_Category">' +
'          <End Role="Food" EntitySet="Foods" />' +
'          <End Role="Category" EntitySet="Categories" />' +
'        </AssociationSet>' +
'        <FunctionImport Name="ResetData" m:HttpMethod="POST" />' +
'        <FunctionImport Name="FoodsAvailable" ReturnType="Collection(Edm.String)" m:HttpMethod="GET" />' +
'        <FunctionImport Name="PackagingTypes" ReturnType="Collection(DataJS.Tests.V2.Package)" m:HttpMethod="GET" />' +
'      </EntityContainer>' +
'    </Schema>' +
'  </edmx:DataServices>' +
'</edmx:Edmx>';


// End of datajs/tests


// QUnit tests
// ====================

// Hello world test
QUnit.module("Module A");
QUnit.test( "hello test", function( assert ) {
        assert.ok( 1 == "1", "Passed!" );
});

// Some tests
QUnit.module("Module B", {
    setup: function () {
        // do some initial stuff before every test for this module
        console.log("Setup...");

        var t = require('../main.js');
        t.init();

        // exports for easy access
        mysqlodata = t.mysqlodata;
        OData      = t.OData;
        datajs     = t.datajs;

        console.log("datajs initilized");

    },
    teardown: function () {
        // do some stuff after every test for this module
    }
});

QUnit.test( "OData.atomHandler.write on customerSampleMetadataText",  function(assert) {

        console.log("Running OData.atomHandler.write on customerSampleMetadataText...")

        var metadata = parseMetadataHelper(customerSampleMetadataText);
        var data = { __metadata: { type: "Ns.Customer" }, Name: "Name", LastName: "Last Name", Address: { Street: "Street Value", City: "City Value" }, FavoriteNumber: 123 };
        var request = { data: data, headers: { "Content-Type": "application/atom+xml"} };

        logJSON("metadata",metadata);
        logJSON("request",request);
        OData.atomHandler.write(request, { metadata: metadata });
        logXML("request.body after write",request.body);

        assert.ok(request.body !== null, "request.body !== null");
        assert.ok(request.body.indexOf("<a:summary type=\"xhtml\">Name</a:summary>") !== -1, 'request.body.indexOf("<a:summary>Name</a:summary>") !== -1');
        assert.ok(request.body.indexOf('baz="Last Name"') !== -1, 'request.body.indexOf(baz="Last Name") !== -1');
        assert.ok(request.body.indexOf('city="City Value"') !== -1, 'request.body.indexOf(city="City Value") !== -1');
//        assert.ok(request.body.indexOf('<prefix:foo ') !== -1, "request.body.indexOf('<prefix:foo ') !== -1");
        assert.ok(request.body.indexOf('term="Ns.Customer"') !== -1, "request.body.indexOf(term='Ns.Customer') !== -1");
        assert.ok(request.body.indexOf('>123</') !== -1, "request.body.indexOf(>123</) !== -1");

        // Try with other mapping types.
        metadata.dataServices.schema[0].entityType[0].property[1].FC_ContentKind = "html";
        request.body = undefined;
        OData.atomHandler.write(request, { metadata: metadata });
        assert.ok(request.body.indexOf("<a:summary type=\"html\">Name</a:summary>") !== -1, 'request.body.indexOf("<a:summary type="html">Name</a:summary>") !== -1');

        // Try with a null value now.
        request.data.FavoriteNumber = null;
        request.body = null;
        OData.atomHandler.write(request, { metadata: metadata });
        assert.ok(request.body.indexOf('>123</') === -1, "request.body.indexOf(>123</) === -1");
        assert.ok(request.body.indexOf('m:null="true"') !== -1, "request.body.indexOf(m:null=true) !== -1");

        // Try with a null complex type now.
        request.data.FavoriteNumber = 123;
        request.data.Address = null;
        request.body = null;
/*        OData.atomHandler.write(request, { metadata: metadata });
        assert.ok(request.body.indexOf('Street') === -1, "request.body.indexOf(Street) === -1");
        assert.ok(request.body.indexOf('m:null="true"') !== -1, "request.body.indexOf(m:null=true) !== -1");
*/
        console.log("End of OData.atomHandler.write on customerSampleMetadataText ...")
});


