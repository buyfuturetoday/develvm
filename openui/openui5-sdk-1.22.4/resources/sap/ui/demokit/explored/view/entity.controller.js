jQuery.sap.require("sap.ui.demokit.EntityInfo");sap.ui.controller("sap.ui.demokit.explored.view.entity",{onInit:function(){this.router=sap.ui.core.UIComponent.getRouterFor(this);this.router.attachRoutePatternMatched(this.onRouteMatched,this);this._component=sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView()))},onTypeLinkPress:function(e){var t=e.getSource().data("type");this.router.navTo("entity",{id:t,part:"samples"},false);this._component.getEventBus().publish("app","selectEntity",{id:t})},onTabSelect:function(e){var t=e.getParameter("key");this.router.navTo("entity",{id:this._sId,part:t},true)},onNavBack:function(e){this.router.myNavBack("home",{})},onNavToSample:function(e){var p=e.getSource().getBindingContext("entity").getPath();var s=this.getView().getModel("entity").getProperty(p);this.router.navTo("sample",{id:s.id})},_TAB_KEYS:["sampes","about","properties","aggregations","associations","events","methods"],onRouteMatched:function(e){var r=e.getParameter("name"),n=e.getParameter("arguments").id,N=e.getParameter("arguments").part;if(r!=="entity"){return}var E=this.getView().getModel("entity");var p=sap.ui.demokit.explored.util.ObjectSearch.getEntityPath(E.getData(),n);var o=(p)?E.getProperty(p):null;var b=!!p;var h=sap.ui.core.routing.History.getInstance();var P=h.getPreviousHash();var s=sap.ui.Device.system.phone||(!b&&!!P);this.getView().byId("page").setShowNavButton(s);var d;if(this._sId!==n){d=this._getViewData(n,o);var m=new sap.ui.model.json.JSONModel(d);this.getView().setModel(m);this.getView().bindElement("entity>"+p);this._sId=n}else{d=this.getView().getModel().getData()}if(this._TAB_KEYS.indexOf(N)===-1){N="samples"}if(!d.show[N]){N="samples"}var t=this.getView().byId("tabBar");if(N!==t.getSelectedKey()&&t.getExpanded()){t.setSelectedKey(N)}},_getViewData:function(i,e){var d=sap.ui.demokit.EntityInfo.getEntityDocu(i);var D=this._convertEntityInfo(i,d);D.show.samples=(e)?e.samples.length>0:false;D.count.samples=(e)?e.samples.length:0;return D},_convertEntityInfo:function(I,d){var D={name:I,deprecated:(d)?this._formatDeprecated(d.deprecation):null,baseType:(d)?this._formatType(d.baseType):null,baseTypeText:(d)?this._formatTypeText(d.baseType):null,baseTypeNav:(d)?this._formatTypeNav(d.baseType):null,description:(d)?d.doc:null,properties:[],events:[],methods:[],aggregations:[],associations:[],values:[],show:{baseType:(d)?!!d.baseType:false,about:!!d,properties:false,events:false,methods:false,aggregations:false,associations:false,values:false},count:{properties:0,events:0,methods:0,aggregations:0,associations:0}};if(!d){return D}var k=null;for(k in d.properties){if(d.properties.hasOwnProperty(k)&&k.indexOf("_")!==0){var P=d.properties[k];P.name=k;P.doc=this._formatDoc(P.doc,P.deprecation);P.deprecated=this._formatDeprecated(P.deprecation);P.typeText=this._formatTypeText(P.type);P.typeNav=this._formatTypeNav(P.type);P.type=this._formatType(P.type);P.defaultValue=(P.defaultValue)?P.defaultValue.replace("empty/undefined","-"):"";D.properties.push(P)}}for(k in d.events){if(d.events.hasOwnProperty(k)&&k.indexOf("_")!==0){var e=d.events[k];e.name=k;e.doc=this._formatDoc(e.doc,e.deprecation);e.deprecated=this._formatDeprecated(e.deprecation);D.events.push(e);for(var p in e.parameters){if(e.parameters.hasOwnProperty(p)&&p.indexOf("_")!==0){D.events.push({param:p,since:e.parameters[p].since,typeText:this._formatTypeText(e.parameters[p].type),typeNav:this._formatTypeNav(e.parameters[p].type),type:this._formatType(e.parameters[p].type),doc:this._formatDoc(e.parameters[p].doc,e.parameters[p].deprecation),deprecated:this._formatDeprecated(e.parameters[p].deprecation)})}}}}for(k in d.methods){if(d.methods.hasOwnProperty(k)&&k.indexOf("_")!==0){var m=d.methods[k];m.name=k;m.doc=this._formatDoc(m.doc,m.deprecation);m.deprecated=this._formatDeprecated(m.deprecation);m.param="returnValue";m.typeText=this._formatTypeText(m.type);m.typeNav=this._formatTypeNav(m.type);m.type=this._formatType(m.type);D.methods.push(m);for(var i=0;i<m.parameters.length;i++){var s=m.parameters[i].name;if(s.indexOf("_")!==0){D.methods.push({param:s,since:m.parameters[i].since,typeText:this._formatTypeText(m.parameters[i].type),typeNav:this._formatTypeNav(m.parameters[i].type),type:this._formatType(m.parameters[i].type),doc:this._formatDoc(m.parameters[i].doc,m.parameters[i].deprecation),deprecated:this._formatDeprecated(m.parameters[i].deprecation)})}}}}for(k in d.aggregations){var a=d.aggregations[k];var n=(!a.hasOwnProperty("visibility")||a.visibility!=="hidden");if(d.aggregations.hasOwnProperty(k)&&k.indexOf("_")!==0&&n){a.name=k;a.doc=this._formatDoc(a.doc,a.deprecation);a.deprecated=this._formatDeprecated(a.deprecation);a.typeText=this._formatTypeText(a.type);a.typeNav=this._formatTypeNav(a.type);a.type=this._formatType(a.type);D.aggregations.push(a)}}for(k in d.associations){if(d.associations.hasOwnProperty(k)&&k.indexOf("_")!==0){var A=d.associations[k];A.name=k;A.doc=this._formatDoc(A.doc,A.deprecation);A.deprecated=this._formatDeprecated(A.deprecation);A.typeText=this._formatTypeText(A.type);A.typeNav=this._formatTypeNav(A.type);A.type=this._formatType(A.type);D.associations.push(A)}}for(k in d.values){if(d.values.hasOwnProperty(k)&&k.indexOf("_")!==0){var v=d.values[k];v.name=k;v.doc=this._formatDoc(v.doc,v.deprecation);v.deprecated=this._formatDeprecated(v.deprecation);D.values.push(v)}}D.show.properties=D.properties.length>0;D.show.events=D.events.length>0;D.show.methods=D.methods.length>0;D.show.aggregations=D.aggregations.length>0;D.show.associations=D.associations.length>0;D.show.values=D.values.length>0;D.count.properties=D.properties.length;D.count.events=D.events.length;D.count.methods=D.methods.length;D.count.aggregations=D.aggregations.length;D.count.associations=D.associations.length;return D},_formatDeprecated:function(d){return(d&&d.length>0)?"true":"false"},_formatDoc:function(d,D){return(D&&D.length>0)?"DEPRECATED. "+D:d},_formatType:function(t){if(!t){return null}else{return t.replace("[]","")}},_formatTypeText:function(t){if(!t){return null}else{t=t.replace("sap.ui.core.","");var i=t.lastIndexOf(".");return(i!==-1)?t.substr(i+1):t}},_baseTypes:["sap.ui.core.any","sap.ui.core.object","sap.ui.core.function","sap.ui.core.number","sap.ui.core.float","sap.ui.core.int","sap.ui.core.boolean","sap.ui.core.string","sap.ui.core.URI","sap.ui.core.ID","sap.ui.core.void","sap.ui.core.CSSSize"],_formatTypeNav:function(t){return this._baseTypes.indexOf(t)===-1}});
