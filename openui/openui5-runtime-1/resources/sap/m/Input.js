/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Input");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.InputBase");sap.m.InputBase.extend("sap.m.Input",{metadata:{publicMethods:["setFilterFunction","setRowResultFunction"],library:"sap.m",properties:{"type":{type:"sap.m.InputType",group:"Data",defaultValue:sap.m.InputType.Text},"maxLength":{type:"int",group:"Behavior",defaultValue:0},"valueStateText":{type:"string",group:"Misc",defaultValue:null},"showValueStateMessage":{type:"boolean",group:"Misc",defaultValue:true},"dateFormat":{type:"string",group:"Misc",defaultValue:'YYYY-MM-dd',deprecated:true},"showValueHelp":{type:"boolean",group:"Behavior",defaultValue:false},"showSuggestion":{type:"boolean",group:"Behavior",defaultValue:false},"valueHelpOnly":{type:"boolean",group:"Behavior",defaultValue:false},"filterSuggests":{type:"boolean",group:"Behavior",defaultValue:true},"maxSuggestionWidth":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"startSuggestion":{type:"int",group:"Behavior",defaultValue:1},"showTableSuggestionValueHelp":{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"suggestionItems",aggregations:{"suggestionItems":{type:"sap.ui.core.Item",multiple:true,singularName:"suggestionItem"},"suggestionColumns":{type:"sap.m.Column",multiple:true,singularName:"suggestionColumn",bindable:"bindable"},"suggestionRows":{type:"sap.m.ColumnListItem",multiple:true,singularName:"suggestionRow",bindable:"bindable"}},events:{"liveChange":{},"valueHelpRequest":{},"suggest":{},"suggestionItemSelected":{}}}});sap.m.Input.M_EVENTS={'liveChange':'liveChange','valueHelpRequest':'valueHelpRequest','suggest':'suggest','suggestionItemSelected':'suggestionItemSelected'};jQuery.sap.require("jquery.sap.strings");jQuery.sap.require("sap.m.Dialog");jQuery.sap.require("sap.m.Popover");jQuery.sap.require("sap.m.List");jQuery.sap.require("sap.m.Table");jQuery.sap.require("sap.m.StandardListItem");jQuery.sap.require("sap.m.Bar");jQuery.sap.require("sap.m.Toolbar");jQuery.sap.require("sap.m.ToolbarSpacer");jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle();
sap.m.Input._DEFAULTFILTER=function(v,i){return jQuery.sap.startsWithIgnoreCase(i.getText(),v)};
sap.m.Input._DEFAULTFILTER_TABULAR=function(v,c){var C=c.getCells(),i=0;for(;i<C.length;i++){if(C[i].getText){return jQuery.sap.startsWithIgnoreCase(C[i].getText(),v)}}return false};
sap.m.Input._DEFAULTRESULT_TABULAR=function(c){var C=c.getCells(),i=0;for(;i<C.length;i++){if(C[i].getText){return C[i].getText()}}return""};
sap.m.Input.prototype.init=function(){sap.m.InputBase.prototype.init.call(this);this._inputProxy=jQuery.proxy(this._onInput,this);this._fnFilter=sap.m.Input._DEFAULTFILTER};
sap.m.Input.prototype.exit=function(){this._deregisterEvents();if(this._oSuggestionPopup){this._oSuggestionPopup.destroy();this._oSuggestionPopup=null}if(this._oList){this._oList.destroy();this._oList=null}if(this._oValueHelpIcon){this._oValueHelpIcon.destroy();this._oValueHelpIcon=null}if(this._oSuggestionTable){this._oSuggestionTable.destroy();this._oSuggestionTable=null}if(this._oButtonToolbar){this._oButtonToolbar.destroy();this._oButtonToolbar=null}if(this._oShowMoreButton){this._oShowMoreButton.destroy();this._oShowMoreButton=null}};
sap.m.Input.prototype._resizePopup=function(){var t=this;if(this._oList&&this._oSuggestionPopup){if(this.getMaxSuggestionWidth()){this._oSuggestionPopup.setContentWidth(this.getMaxSuggestionWidth())}else{this._oSuggestionPopup.setContentWidth((this.$().outerWidth())+"px")}setTimeout(function(){if(t._oSuggestionPopup.isOpen()&&t._oSuggestionPopup.$().outerWidth()<t.$().outerWidth()){t._oSuggestionPopup.setContentWidth((t.$().outerWidth())+"px")}},0)}};
sap.m.Input.prototype.onBeforeRendering=function(){sap.m.InputBase.prototype.onBeforeRendering.call(this);this._deregisterEvents()};
sap.m.Input.prototype.onAfterRendering=function(){var t=this;sap.m.InputBase.prototype.onAfterRendering.call(this);this.bindToInputEvent(this._inputProxy);if(!sap.ui.Device.system.phone){this._resizePopup();this._sPopupResizeHandler=sap.ui.core.ResizeHandler.register(this.getDomRef(),function(){t._resizePopup()})}if(sap.ui.Device.system.phone){this.$().on("click",jQuery.proxy(function(){if(this.getShowSuggestion()&&this._oSuggestionPopup){this._oSuggestionPopup.open();this._oPopupInput._$input.focus()}},this))}};
sap.m.Input.prototype._getValueHelpIcon=function(){var t=this;if(!this._oValueHelpIcon){var u=sap.ui.core.IconPool.getIconURI("value-help");this._oValueHelpIcon=sap.ui.core.IconPool.createControlByURI({id:this.getId()+"__vhi",src:u});this._oValueHelpIcon.addStyleClass("sapMInputValHelpInner");this._oValueHelpIcon.attachPress(function(e){if(!t.getValueHelpOnly()){t.fireValueHelpRequest({fromSuggestions:false})}})}return this._oValueHelpIcon};
sap.m.Input.prototype._fireValueHelpRequestForValueHelpOnly=function(){if(this.getEnabled()&&this.getEditable()&&this.getShowValueHelp()&&this.getValueHelpOnly()){this.fireValueHelpRequest({fromSuggestions:false})}};
sap.m.Input.prototype.ontap=function(e){this._fireValueHelpRequestForValueHelpOnly()};
sap.m.Input.prototype.setWidth=function(w){return sap.m.InputBase.prototype.setWidth.call(this,w||"100%");return this};
sap.m.Input.prototype.getWidth=function(){return this.getProperty("width")||"100%"};
sap.m.Input.prototype.setFilterFunction=function(f){if(f===null||f===undefined){this._fnFilter=sap.m.Input._DEFAULTFILTER;return this}this._fnFilter=f;return this};
sap.m.Input.prototype.setRowResultFunction=function(f){if(f===null||f===undefined){this._fnRowResultFilter=sap.m.Input._DEFAULTRESULT_TABULAR;return this}this._fnRowResultFilter=f;return this};
sap.m.Input.prototype._doSelect=function(s,e){if(sap.ui.Device.support.touch){return}var d=this._$input[0];if(d){var r=this._$input;d.focus();r.selectText(s?s:0,e?e:r.val().length)}return this};
sap.m.Input.prototype._scrollToItem=function(i,d){var p=this._oSuggestionPopup,l=this._oList;if(!(p instanceof sap.m.Popover)||!l){return}var L=l.getItems()[i],o=L&&L.$()[0];if(o){o.scrollIntoView(d==="up")}};
sap.m.Input.prototype._isSuggestionItemSelectable=function(i){return i.getVisible()&&(this._hasTabularSuggestions()||i.getType()!==sap.m.ListType.Inactive)};
sap.m.Input.prototype._onsaparrowkey=function(e,d){if(!this.getEnabled()||!this.getEditable()){return}if(!this._oSuggestionPopup||!this._oSuggestionPopup.isOpen()){return}if(d!=="up"&&d!=="down"){return}var f=false,l=this._oList,i=this.getSuggestionItems(),L=l.getItems(),s=this._iPopupListSelectedIndex,n,o=s;if(d==="up"&&s===0){return}if(d=="down"&&s===L.length-1){return}if(s===-1){s=0;if(this._isSuggestionItemSelectable(L[s])){o=s;f=true}else{d="down"}}if(d==="down"){while(s<L.length-1&&(!f||!this._isSuggestionItemSelectable(L[s]))){L[s].setSelected(false);s=s+1;f=true}}else{while(s>0&&(!f||!L[s].getVisible()||!this._isSuggestionItemSelectable(L[s]))){L[s].setSelected(false);s=s-1;f=true}}if(!this._isSuggestionItemSelectable(L[s])){if(o>=0){L[o].setSelected(true)}return}else{L[s].setSelected(true)}if(sap.ui.Device.system.desktop){this._scrollToItem(s,d)}if(sap.m.ColumnListItem&&L[s]instanceof sap.m.ColumnListItem){n=this._getInputValue(this._fnRowResultFilter(L[s]))}else{var b=(i[0]instanceof sap.ui.core.ListItem?true:false);if(b){n=this._getInputValue(L[s].getLabel())}else{n=this._getInputValue(L[s].getTitle())}}this._$input.val(n);this._sSelectedSuggViaKeyboard=n;this._doSelect();this._iPopupListSelectedIndex=s;e.preventDefault();e.stopPropagation()};
sap.m.Input.prototype.onsapup=function(e){this._onsaparrowkey(e,"up")};
sap.m.Input.prototype.onsapdown=function(e){this._onsaparrowkey(e,"down")};
sap.m.Input.prototype.onsapescape=function(e){if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){e.originalEvent._sapui_handledByControl=true;this._oSuggestionPopup.close();return}if(sap.m.InputBase.prototype.onsapescape){sap.m.InputBase.prototype.onsapescape.apply(this,arguments)}};
sap.m.Input.prototype.onsapenter=function(e){if(sap.m.InputBase.prototype.onsapenter){sap.m.InputBase.prototype.onsapenter.apply(this,arguments)}if(this._iSuggestDelay){jQuery.sap.clearDelayedCall(this._iSuggestDelay);this._iSuggestDelay=null}if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){if(this._iPopupListSelectedIndex>=0){var s=this._oList.getItems()[this._iPopupListSelectedIndex];this._changeProxy(e);this._doSelect();if(s){this._fireSuggestionItemSelectedEvent(s)}this._iPopupListSelectedIndex=-1}this._oSuggestionPopup.close()}};
sap.m.Input.prototype.onsapfocusleave=function(e){var p=this._oSuggestionPopup;if(!(p instanceof sap.m.Popover)){return}if(e.relatedControlId&&jQuery.sap.containsOrEquals(p.getFocusDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){this.focus()}else{if(this._$input.val()===this._sSelectedSuggViaKeyboard){this._sSelectedSuggViaKeyboard=null;this._$input.change()}}};
sap.m.Input.prototype.onmousedown=function(e){var p=this._oSuggestionPopup;if((p instanceof sap.m.Popover)&&p.isOpen()){e.stopPropagation()}};
sap.m.Input.prototype._deregisterEvents=function(){if(this._sPopupResizeHandler){sap.ui.core.ResizeHandler.deregister(this._sPopupResizeHandler);this._sPopupResizeHandler=null}if(sap.ui.Device.system.phone&&this._oSuggestionPopup){this.$().off("click")}};
sap.m.Input.prototype.updateSuggestionItems=function(){this.updateAggregation("suggestionItems");this._refreshItemsDelayed();return this};
sap.m.Input.prototype._triggerSuggest=function(v){if(this._iSuggestDelay){jQuery.sap.clearDelayedCall(this._iSuggestDelay);this._iSuggestDelay=null}if(!v){v=""}if(v.length>=this.getStartSuggestion()){this._iSuggestDelay=jQuery.sap.delayedCall(300,this,function(){this._bBindingUpdated=false;this.fireSuggest({suggestValue:v});if(!this.bBindingUpdate){this._refreshItemsDelayed()}})}else if(sap.ui.Device.system.phone){if(this._oList instanceof sap.m.Table){this._oList.addStyleClass("sapMInputSuggestionTableHidden")}else{this._oList.destroyItems()}}else if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){this._oSuggestionPopup.close()}};
(function(){sap.m.Input.prototype.setShowSuggestion=function(v){this.setProperty("showSuggestion",v,true);this._iPopupListSelectedIndex=-1;if(v){this._lazyInitializeSuggestionPopup(this)}else{d(this)}return this};sap.m.Input.prototype.setShowTableSuggestionValueHelp=function(v){this.setProperty("showTableSuggestionValueHelp",v,true);if(!this._oSuggestionPopup){return this}if(v){this._addShowMoreButton()}else{this._removeShowMoreButton()}return this};sap.m.Input.prototype._getShowMoreButton=function(){var t=this,m=sap.ui.getCore().getLibraryResourceBundle("sap.m");return this._oShowMoreButton||(this._oShowMoreButton=new sap.m.Button({text:m.getText("INPUT_SUGGESTIONS_SHOW_ALL"),press:function(){if(t.getShowTableSuggestionValueHelp()){t.fireValueHelpRequest({fromSuggestions:true});t._oSuggestionPopup.close()}}}))};sap.m.Input.prototype._getButtonToolbar=function(){var s=this._getShowMoreButton();return this._oButtonToolbar||(this._oButtonToolbar=new sap.m.Toolbar({content:[new sap.m.ToolbarSpacer(),s]}))};sap.m.Input.prototype._addShowMoreButton=function(){if(!this._oSuggestionPopup||!this._hasTabularSuggestions()){return}if(this._oSuggestionPopup instanceof sap.m.Dialog){var s=this._getShowMoreButton();this._oSuggestionPopup.setEndButton(s)}else{var b=this._getButtonToolbar();this._oSuggestionPopup.setFooter(b)}};sap.m.Input.prototype._removeShowMoreButton=function(){if(!this._oSuggestionPopup||!this._hasTabularSuggestions()){return}if(this._oSuggestionPopup instanceof sap.m.Dialog){this._oSuggestionPopup.setEndButton(null)}else{this._oSuggestionPopup.setFooter(null)}};sap.m.Input.prototype._onInput=function(e){var v=this._$input.val();if(this.getMaxLength()>0&&v.length>this.getMaxLength()){v=v.substring(0,this.getMaxLength());this._$input.val(v)}if(v!==this.getProperty("value")){this.setProperty("value",v,true);this._setLabelVisibility();this.fireLiveChange({value:v,newValue:v});if(!this.getShowSuggestion()||sap.ui.Device.system.phone){return}this._triggerSuggest(v)}};sap.m.Input.prototype._refreshItemsDelayed=function(){jQuery.sap.clearDelayedCall(this._iRefreshListTimeout);this._iRefreshListTimeout=jQuery.sap.delayedCall(0,this,r,[this])};sap.m.Input.prototype.addSuggestionItem=function(i){this.addAggregation("suggestionItems",i,true);this._refreshItemsDelayed();a(this);return this};sap.m.Input.prototype.insertSuggestionItem=function(i,I){this.insertAggregation("suggestionItems",I,i,true);this._refreshItemsDelayed();a(this);return this};sap.m.Input.prototype.removeSuggestionItem=function(i){var b=this.removeAggregation("suggestionItems",i,true);this._refreshItemsDelayed();return b};sap.m.Input.prototype.removeAllSuggestionItems=function(){var b=this.removeAllAggregation("suggestionItems",true);this._refreshItemsDelayed();return b};sap.m.Input.prototype.destroySuggestionItems=function(){this.destroyAggregation("suggestionItems",true);this._refreshItemsDelayed();return this};sap.m.Input.prototype.addSuggestionRow=function(i){i.setType(sap.m.ListType.Active);this.addAggregation("suggestionRows",i);this._refreshItemsDelayed();a(this);return this};sap.m.Input.prototype.insertSuggestionRow=function(i,I){i.setType(sap.m.ListType.Active);this.insertAggregation("suggestionRows",I,i);this._refreshItemsDelayed();a(this);return this};sap.m.Input.prototype.removeSuggestionRow=function(i){var b=this.removeAggregation("suggestionRows",i);this._refreshItemsDelayed();return b};sap.m.Input.prototype.removeAllSuggestionRows=function(){var b=this.removeAllAggregation("suggestionRows");this._refreshItemsDelayed();return b};sap.m.Input.prototype.destroySuggestionRows=function(){this.destroyAggregation("suggestionRows");this._refreshItemsDelayed();return this};sap.m.Input.prototype.bindAggregation=function(){var b=Array.prototype.slice.call(arguments);if(b[0]==="suggestionRows"||b[0]==="suggestionColumns"||b[0]==="suggestionItems"){a(this,b[0]==="suggestionRows"||b[0]==="suggestionColumns");this._bBindingUpdated=true}this._callMethodInManagedObject.apply(this,["bindAggregation"].concat(b));return this};sap.m.Input.prototype._lazyInitializeSuggestionPopup=function(){if(!this._oSuggestionPopup){c(this)}};function c(i){var m=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(sap.ui.Device.system.phone){i._oPopupInput=new sap.m.Input(i.getId()+"-popup-input",{width:"100%",liveChange:function(e){var v=e.getParameter("newValue");i.setValue(v);i._triggerSuggest(v);i.fireLiveChange({value:v,newValue:v})},}).addStyleClass("sapMInputSuggInDialog")}i._oSuggestionPopup=!sap.ui.Device.system.phone?(new sap.m.Popover(i.getId()+"-popup",{showHeader:false,placement:sap.m.PlacementType.Vertical,initialFocus:i}).attachAfterClose(function(){i._iPopupListSelectedIndex=-1;if(i._oList instanceof sap.m.Table){i._oList.removeSelections(true)}else{i._oList.destroyItems()}})):(new sap.m.Dialog(i.getId()+"-popup",{beginButton:new sap.m.Button(i.getId()+"-popup-closeButton",{text:m.getText("MSGBOX_CLOSE"),press:function(){i._oSuggestionPopup.close()}}),stretch:true,customHeader:new sap.m.Bar(i.getId()+"-popup-header",{contentMiddle:i._oPopupInput}),horizontalScrolling:false,initialFocus:i._oPopupInput}).attachBeforeOpen(function(){i._oPopupInput.setPlaceholder(i.getPlaceholder());i._oPopupInput.setMaxLength(i.getMaxLength())}).attachAfterClose(function(){i._$input.val(i._getInputValue(i._oPopupInput.getValue()));i._changeProxy();if(sap.m.Table&&!(i._oList instanceof sap.m.Table)){i._oList.destroyItems()}else{i._oList.removeSelections(true)}}).attachAfterOpen(function(){var v=i.getValue();i._oPopupInput.setValue(v);i.fireSuggest({suggestValue:v});r(i)}));i._oSuggestionPopup.addStyleClass("sapMInputSuggestionPopup");i.addDependent(i._oSuggestionPopup);if(!sap.ui.Device.system.phone){o(i._oSuggestionPopup,i)}if(i._oList){i._oSuggestionPopup.addContent(i._oList)}if(i.getShowTableSuggestionValueHelp()){i._addShowMoreButton()}}function a(i,t){if(i._oList){return}if(!i._hasTabularSuggestions()&&!t){i._oList=new sap.m.List(i.getId()+"-popup-list",{width:"100%",showNoData:false})}else{if(i._fnFilter===sap.m.Input._DEFAULTFILTER){i._fnFilter=sap.m.Input._DEFAULTFILTER_TABULAR}if(!i._fnRowResultFilter){i._fnRowResultFilter=sap.m.Input._DEFAULTRESULT_TABULAR}i._oList=i._getSuggestionsTable();if(i.getShowTableSuggestionValueHelp()){i._addShowMoreButton()}}if(i._oSuggestionPopup){i._oSuggestionPopup.addContent(i._oList)}}function d(i){if(i._oList instanceof sap.m.Table){i._oSuggestionPopup.removeAllContent();i._removeShowMoreButton()}if(i._oSuggestionPopup){i._oSuggestionPopup.destroy();i._oSuggestionPopup=null}if(i._oList instanceof sap.m.List){i._oList.destroy();i._oList=null}}function o(p,i){p._marginTop=0;p._marginLeft=0;p._marginRight=0;p._marginBottom=0;p._arrowOffset=0;p._offsets=["0 0","0 0","0 0","0 0"];p._myPositions=["begin bottom","begin center","begin top","end center"];p._atPositions=["begin top","end center","begin bottom","begin center"];p.open=function(){this.openBy(i,false,true)};p.oPopup.setAnimations(function(R,b,O){O()},function(R,b,C){C()})}function r(I){var s=I.getShowSuggestion();this._iPopupListSelectedIndex=-1;if(!(s&&I.getDomRef()&&(sap.ui.Device.system.phone||I.$().hasClass("sapMInputFocused")))){return false}var b,e=I.getSuggestionItems(),t=I.getSuggestionRows(),T=I._$input.val(),l=I._oList,f=T&&T.length>0,h=[],g=0,p=I._oSuggestionPopup,L={ontouchstart:function(E){(E.originalEvent||E)._sapui_cancelAutoClose=true}},j,i;if(I._oList){if(I._oList instanceof sap.m.Table){l.removeSelections(true)}else{l.destroyItems()}}if(!f&&I.getFilterSuggests()){if(!sap.ui.Device.system.phone){p.close()}else{if(I._hasTabularSuggestions()&&I._oList){I._oList.addStyleClass("sapMInputSuggestionTableHidden")}}return false}else{f=I.getFilterSuggests()}if(I._hasTabularSuggestions()){if(sap.ui.Device.system.phone&&I._oList){I._oList.removeStyleClass("sapMInputSuggestionTableHidden")}for(i=0;i<t.length;i++){if(!f||I._fnFilter(T,t[i])){t[i].setVisible(true);h.push(t[i])}else{t[i].setVisible(false)}}}else{var k=(e[0]instanceof sap.ui.core.ListItem?true:false);for(i=0;i<e.length;i++){b=e[i];if(!f||I._fnFilter(T,b)){if(k){j=new sap.m.DisplayListItem(b.getId()+"-dli");j.setLabel(b.getText());j.setValue(b.getAdditionalText())}else{j=new sap.m.StandardListItem(b.getId()+"-sli");j.setTitle(b.getText())}j.setType(b.getEnabled()?sap.m.ListType.Active:sap.m.ListType.Inactive);j.attachPress(function(){if(sap.ui.Device.system.phone){if(k){I._oPopupInput.setValue(this.getLabel())}else{I._oPopupInput.setValue(this.getTitle())}I._oPopupInput._doSelect()}else{if(k){I._$input.val(I._getInputValue(this.getLabel()))}else{I._$input.val(I._getInputValue(this.getTitle()))}I._changeProxy()}p.close();if(!sap.ui.Device.support.touch){I._doSelect()}I.fireSuggestionItemSelected({selectedItem:this._oItem})});j._oItem=b;j.addEventDelegate(L);h.push(j)}}}g=h.length;if(g>0){if(!I._hasTabularSuggestions()){for(i=0;i<g;i++){l.addItem(h[i])}}if(!sap.ui.Device.system.phone){if(I._sCloseTimer){clearTimeout(I._sCloseTimer);I._sCloseTimer=null}if(!p.isOpen()&&!I._sOpenTimer){I._sOpenTimer=setTimeout(function(){p.open();I._resizePopup();I._sOpenTimer=null},0)}}}else{if(!sap.ui.Device.system.phone){if(p.isOpen()){I._sCloseTimer=setTimeout(function(){p.close()},0)}}else{if(I._hasTabularSuggestions()&&I._oList){I._oList.addStyleClass("sapMInputSuggestionTableHidden")}}}}})();(function(){function c(i){if(i._popup){i._popup.close()}};function o(i){var s=i.getValueState();if(i.getShowValueStateMessage()&&s&&((s===sap.ui.core.ValueState.Warning)||(s===sap.ui.core.ValueState.Error))&&i.getEnabled()&&i.getEditable()){var t=i.getValueStateText();if(!t){t=sap.ui.core.ValueStateSupport.getAdditionalText(i)}if(!t){return}var m=i.getId()+"-message";if(!i._popup){jQuery.sap.require("sap.ui.core.Popup");jQuery.sap.require("jquery.sap.encoder");i._popup=new sap.ui.core.Popup(jQuery("<span></span>")[0],false,false,false);i._popup.attachClosed(function(){jQuery.sap.byId(m).remove()})}var I=jQuery(i.getFocusDomRef());var d=sap.ui.core.Popup.Dock;var b=I.css("text-align")==="right";var C="sapMInputMessage "+((s===sap.ui.core.ValueState.Warning)?"sapMInputMessageWarning":"sapMInputMessageError");i._popup.setContent(jQuery("<div style=\"max-width:"+I.outerWidth()+"px;\" class=\""+C+"\" id=\""+m+"\"><span id=\""+m+"-text\">"+jQuery.sap.encodeHTML(t)+"</span></div>"));i._popup.close(0);i._popup.open(200,b?d.EndTop:d.BeginTop,b?d.EndBottom:d.BeginBottom,i.getFocusDomRef(),null,null,function(){i._popup.close()})}};sap.m.Input.prototype.setValueState=function(v){var O=this.getValueState();sap.m.InputBase.prototype.setValueState.apply(this,arguments);var n=this.getValueState();if(this.getDomRef()&&n!=O&&this.getFocusDomRef()===document.activeElement){switch(n){case sap.ui.core.ValueState.Error:case sap.ui.core.ValueState.Warning:o(this);break;default:c(this)}}return this};sap.m.Input.prototype.setValueStateText=function(t){this.$("message-text").text(t);return this.setProperty("valueStateText",t,true)};sap.m.Input.prototype.onfocusin=function(e){this.$().addClass("sapMInputFocused");o(this);if(!this.getStartSuggestion()&&!this.getValue()){this._triggerSuggest(this.getValue())}};sap.m.Input.prototype.onsapshow=function(e){if(!this.getEnabled()||!this.getShowValueHelp()){return}this.fireValueHelpRequest({fromSuggestions:false});e.preventDefault();e.stopPropagation()};sap.m.Input.prototype.onsapselect=function(e){this._fireValueHelpRequestForValueHelpOnly()};sap.m.Input.prototype.onkeydown=function(e){c(this);sap.m.InputBase.prototype.onkeydown.apply(this,arguments)};sap.m.Input.prototype.onfocusout=function(e){this.$().removeClass("sapMInputFocused");c(this);sap.m.InputBase.prototype.onfocusout.apply(this,arguments)}})();
sap.m.Input.prototype._hasTabularSuggestions=function(){return!!(this.getAggregation("suggestionColumns")&&this.getAggregation("suggestionColumns").length)};
sap.m.Input.prototype._getSuggestionsTable=function(){var t=this;if(!this._oSuggestionTable){this._oSuggestionTable=new sap.m.Table(this.getId()+"-popup-table",{mode:sap.m.ListMode.SingleSelectMaster,showNoData:false,showSeparators:"All",width:"100%",enableBusyIndicator:false,selectionChange:function(e){var s=e.getParameter("listItem"),n=t._fnRowResultFilter(s);if(sap.ui.Device.system.phone){t._oPopupInput.setValue(n);t._oPopupInput._doSelect()}else{t._$input.val(t._getInputValue(n));t._changeProxy()}t._oSuggestionPopup.close();if(!sap.ui.Device.support.touch){t._doSelect()}t.fireSuggestionItemSelected({selectedRow:s})}});if(sap.ui.Device.system.phone){this._oSuggestionTable.addStyleClass("sapMInputSuggestionTableHidden")}this._oSuggestionTable.updateItems=function(){sap.m.Table.prototype.updateItems.apply(this,arguments);t._refreshItemsDelayed();return this}}return this._oSuggestionTable};
sap.m.Input.prototype._fireSuggestionItemSelectedEvent=function(s){if(sap.m.ColumnListItem&&s instanceof sap.m.ColumnListItem){this.fireSuggestionItemSelected({selectedRow:s})}else{this.fireSuggestionItemSelected({selectedItem:s._oItem})}};
sap.m.Input.prototype._callMethodInManagedObject=function(f,a){var A=Array.prototype.slice.call(arguments),s;if(a==="suggestionColumns"){s=this._getSuggestionsTable();return s[f].apply(s,["columns"].concat(A.slice(2)))}else if(a==="suggestionRows"){s=this._getSuggestionsTable();return s[f].apply(s,["items"].concat(A.slice(2)))}else{return sap.ui.core.Control.prototype[f].apply(this,A.slice(1))}};
sap.m.Input.prototype.validateAggregation=function(a,o,m){return this._callMethodInManagedObject("validateAggregation",a,o,m)};
sap.m.Input.prototype.setAggregation=function(a,o,s){this._callMethodInManagedObject("setAggregation",a,o,s);return this};
sap.m.Input.prototype.getAggregation=function(a,d){return this._callMethodInManagedObject("getAggregation",a,d)};
sap.m.Input.prototype.indexOfAggregation=function(a,o){return this._callMethodInManagedObject("indexOfAggregation",a,o)};
sap.m.Input.prototype.insertAggregation=function(a,o,i,s){this._callMethodInManagedObject("insertAggregation",a,o,i,s);return this};
sap.m.Input.prototype.addAggregation=function(a,o,s){this._callMethodInManagedObject("addAggregation",a,o,s);return this};
sap.m.Input.prototype.removeAggregation=function(a,o,s){this._callMethodInManagedObject("removeAggregation",a,o,s);return this};
sap.m.Input.prototype.removeAllAggregation=function(a,s){return this._callMethodInManagedObject("removeAllAggregation",a,s)};
sap.m.Input.prototype.destroyAggregation=function(a,s){this._callMethodInManagedObject("destroyAggregation",a,s);return this};
sap.m.Input.prototype.getBinding=function(a){return this._callMethodInManagedObject("getBinding",a)};
sap.m.Input.prototype.getBindingInfo=function(a){return this._callMethodInManagedObject("getBindingInfo",a)};
sap.m.Input.prototype.getBindingPath=function(a){return this._callMethodInManagedObject("getBindingPath",a)};
