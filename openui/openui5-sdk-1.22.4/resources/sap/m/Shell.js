/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Shell");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Shell",{metadata:{library:"sap.m",properties:{"title":{type:"string",group:"Misc",defaultValue:null},"logo":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},"showLogout":{type:"boolean",group:"Behavior",defaultValue:true},"headerRightText":{type:"string",group:"Data",defaultValue:null},"appWidthLimited":{type:"boolean",group:"Appearance",defaultValue:true},"backgroundColor":{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},"backgroundImage":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},"backgroundRepeat":{type:"boolean",group:"Appearance",defaultValue:false},"backgroundOpacity":{type:"float",group:"Appearance",defaultValue:1},"homeIcon":{type:"object",group:"Misc",defaultValue:null}},defaultAggregation:"app",aggregations:{"app":{type:"sap.ui.core.Control",multiple:false}},events:{"logout":{}}}});sap.m.Shell.M_EVENTS={'logout':'logout'};
sap.m.Shell.prototype.init=function(){sap.ui.getCore().attachThemeChanged(jQuery.proxy(function(){var $=this.$("hdr");if($.length){$.find(".sapMShellLogo").remove();var h=sap.m.ShellRenderer.getLogoImageHtml(this);$.prepend(jQuery(h))}},this));jQuery.sap.initMobile({statusBar:"default",hideBrowser:true})};
sap.m.Shell.prototype.onAfterRendering=function(){var r=this.getDomRef().parentNode,$;if(r&&!r._sapui5_heightFixed){r._sapui5_heightFixed=true;while(r&&r!==document.documentElement){$=jQuery(r);if($.attr("data-sap-ui-root-content")){break}if(!r.style.height){r.style.height="100%"}r=r.parentNode}}this.$("content").css("height","")};
sap.m.Shell.prototype.ontap=function(e){if(e.target.className&&e.target.className.indexOf&&e.target.className.indexOf("sapMShellHeaderLogout")>-1){this.fireLogout()}};
sap.m.Shell.prototype.setTitle=function(t){this.$("hdrTxt").text(t);this.setProperty("title",t,true);return this};
sap.m.Shell.prototype.setHeaderRightText=function(t){this.setProperty("headerRightText",t,true);if(!t){t=""}this.$("hdrRightTxt").text(t).css("display",(!!t?"inline":"none"));return this};
sap.m.Shell.prototype.setAppWidthLimited=function(l){this.$().toggleClass("sapMShellAppWidthLimited",l);this.setProperty("appWidthLimited",l,true);return this};
sap.m.Shell.prototype.setBackgroundOpacity=function(o){if(o>1||o<0){jQuery.sap.log.warning("Invalid value "+o+" for Shell.setBackgroundOpacity() ignored. Valid values are: floats between 0 and 1.");return this}this.$("BG").css("opacity",o);return this.setProperty("backgroundOpacity",o,true)};
sap.m.Shell.prototype.setHomeIcon=function(i){this.setProperty("homeIcon",i,true);jQuery.sap.setIcons(i)};
