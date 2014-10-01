/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.SearchField");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.SearchField",{metadata:{library:"sap.m",properties:{"value":{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"maxLength":{type:"int",group:"Behavior",defaultValue:0},"placeholder":{type:"string",group:"Misc",defaultValue:null},"showMagnifier":{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},"showRefreshButton":{type:"boolean",group:"Behavior",defaultValue:false},"refreshButtonTooltip":{type:"string",group:"Misc",defaultValue:null},"selectOnFocus":{type:"boolean",group:"Behavior",defaultValue:true}},events:{"search":{},"liveChange":{}}}});sap.m.SearchField.M_EVENTS={'search':'search','liveChange':'liveChange'};jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.call(sap.m.SearchField.prototype);jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle();jQuery.sap.require("sap.ui.core.theming.Parameters");
sap.m.SearchField.prototype.init=function(){this._inputEvent=sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<10?"keyup":"input";if(sap.ui.core.theming.Parameters.get("sapMPlatformDependent")!=="true"){this._sDesign="bluecrystal"}this.setProperty("placeholder",sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("FACETFILTER_SEARCH"),true)};
sap.m.SearchField.prototype.getFocusDomRef=function(){return this._inputElement};
sap.m.SearchField.prototype.getWidth=function(){return this.getProperty("width")||"100%"};
sap.m.SearchField.prototype._hasPlacehoder=(function(){return"placeholder"in document.createElement("input")}());
sap.m.SearchField.prototype.onBeforeRendering=function(){jQuery(this._inputElement).unbind();this._inputElement=null};
sap.m.SearchField.prototype.onAfterRendering=function(){this._inputElement=this.getDomRef("I");var $=jQuery(this._inputElement).bind(this._inputEvent,jQuery.proxy(this.onInput,this)).bind("search",jQuery.proxy(this.onSearch,this)).bind("change",jQuery.proxy(this.onChange,this)).bind("focus",jQuery.proxy(this.onFocus,this)).bind("blur",jQuery.proxy(this.onBlur,this))};
sap.m.SearchField.prototype.clear=function(){if(!this._inputElement||this.getValue()===""){return}this.setValue("");this.fireLiveChange({newValue:""});this.fireSearch({query:""})};
sap.m.SearchField.prototype.ontouchstart=function(e){if(e.originalEvent.button===2)return;var s=e.target,i=this.getId();if(s.id==i+"-search"||s.id==i+"-reset"){e.preventDefault()}};
sap.m.SearchField.prototype.ontouchend=function(e){if(e.originalEvent.button===2)return;var s=e.target;if(s.id==this.getId()+"-reset"){var E=!this.getValue();this.clear();var a=document.activeElement;if((sap.ui.Device.system.desktop||E||/(INPUT|TEXTAREA)/i.test(a.tagName))&&(a!==this._inputElement)){this._inputElement.focus()}}else if(s.id==this.getId()+"-search"){if(sap.ui.Device.system.desktop&&!this.getShowRefreshButton()&&(document.activeElement!==this._inputElement)){this._inputElement.focus()}this.fireSearch({query:this.getValue(),refreshButtonPressed:this.getShowRefreshButton()&&!this.$().hasClass("sapMFocus")})}else{this.onmouseup(e)}};
sap.m.SearchField.prototype.onmouseup=function(e){if(this.getEnabled()&&e.target.tagName=="FORM"){this._inputElement.focus()}};
sap.m.SearchField.prototype.onSearch=function(e){var v=this._inputElement.value;this.setValue(v);this.fireSearch({query:v});if(!sap.ui.Device.system.desktop){this._blur()}};
sap.m.SearchField.prototype._blur=function(){var t=this;window.setTimeout(function(){if(t._inputElement){t._inputElement.blur()}},13)};
sap.m.SearchField.prototype.onChange=function(e){this.setValue(this._inputElement.value)};
sap.m.SearchField.prototype.onInput=function(e){var v=this._inputElement.value;if(v!=this.getValue()){this.setValue(v);this.fireLiveChange({newValue:v})}};
sap.m.SearchField.prototype.onkeydown=function(e){if(e.which===jQuery.sap.KeyCodes.F5||e.which===jQuery.sap.KeyCodes.ENTER){this.$("search").toggleClass("sapMSFBA",true);e.stopPropagation();e.preventDefault()}};
sap.m.SearchField.prototype.onkeyup=function(e){if(e.which===jQuery.sap.KeyCodes.F5||e.which===jQuery.sap.KeyCodes.ENTER){this.$("search").toggleClass("sapMSFBA",false);this.fireSearch({query:this.getValue(),refreshButtonPressed:this.getShowRefreshButton()&&e.which===jQuery.sap.KeyCodes.F5})}};
sap.m.SearchField.prototype.onFocus=function(e){this.$().toggleClass("sapMFocus",true);var i=this._inputElement;if(i&&i.value&&!this.getSelectOnFocus()){window.setTimeout(function(){i.setSelectionRange(i.value.length,i.value.length)},0)}};
sap.m.SearchField.prototype.onBlur=function(e){this.$().toggleClass("sapMFocus",false)};
sap.m.SearchField.prototype.setValue=function(v){if(this._inputElement){if(this._inputElement.value!==v){this._inputElement.value=v}var $=this.$();if($.hasClass("sapMSFVal")==!v){$.toggleClass("sapMSFVal",!!v)}}this.setProperty("value",v,true);return this};
