/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.demokit.IndexLayout");jQuery.sap.require("sap.ui.demokit.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.demokit.IndexLayout",{metadata:{library:"sap.ui.demokit",properties:{"itemWidth":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'200px'},"itemHeight":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'200px'},"enableScaling":{type:"boolean",group:"Appearance",defaultValue:true}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}}});jQuery.sap.require("sap.ui.Device");jQuery.sap.require("sap.ui.core.IntervalTrigger");sap.ui.demokit.IndexLayout._MINMARGIN=18;sap.ui.demokit.IndexLayout._DEFAULT_ITEM_HEIGHT=200;sap.ui.demokit.IndexLayout._DEFAULT_ITEM_WIDTH=200;sap.ui.demokit.IndexLayout._pos=null;(function(){sap.ui.demokit.IndexLayout._IntervalTrigger=new sap.ui.core.IntervalTrigger(300);sap.ui.demokit.IndexLayout.prototype.init=function(){this._itemWidth=sap.ui.demokit.IndexLayout._DEFAULT_ITEM_WIDTH;this._itemHeight=sap.ui.demokit.IndexLayout._DEFAULT_ITEM_HEIGHT;this._tilesPerRow;this._width;this._registered=false;this._itemScaleFactor=1;sap.ui.Device.media.attachHandler(s,this,sap.ui.Device.media.RANGESETS.SAP_STANDARD)};sap.ui.demokit.IndexLayout.prototype.exit=function(){this.onBeforeRendering();sap.ui.Device.media.detachHandler(s,this,sap.ui.Device.media.RANGESETS.SAP_STANDARD)};sap.ui.demokit.IndexLayout.prototype.setItemWidth=function(i){this.setProperty("itemWidth",i,true);if(!i||i.indexOf("px")<0){this._itemWidth=sap.ui.demokit.IndexLayout._DEFAULT_ITEM_WIDTH;this.setProperty("itemWidth",this._itemWidth,true)}else{this._itemWidth=parseInt(i,10)}_(this);return this};sap.ui.demokit.IndexLayout.prototype.setItemHeight=function(i){this.setProperty("itemHeight",i,true);if(!i||i.indexOf("px")<0){this._itemHeight=sap.ui.demokit.IndexLayout._DEFAULT_ITEM_HEIGHT;this.setProperty("itemHeight",this._itemHeight,true)}else{this._itemHeight=parseInt(i,10)}_(this);return this};sap.ui.demokit.IndexLayout.prototype.setEnableScaling=function(e){this.setProperty("enableScaling",e,true);_(this);return this};sap.ui.demokit.IndexLayout.prototype.onBeforeRendering=function(){if(this._registered){sap.ui.demokit.IndexLayout._IntervalTrigger.removeListener(r,this);this._registered=false}var m=sap.ui.Device.media.getCurrentRange(sap.ui.Device.media.RANGESETS.SAP_STANDARD);s.apply(this,[m,true])};sap.ui.demokit.IndexLayout.prototype.onThemeChanged=function(){if(this.getDomRef()){this.invalidate()}};sap.ui.demokit.IndexLayout.prototype.onAfterRendering=function(){if(!sap.ui.demokit.IndexLayout._pos){var t=null;var S=this.getDomRef().style;if("webkitTransform"in S){t="-webkit-transform"}else if("transform"in S){t="transform"}else if("msTransform"in S){t="-ms-transform"}else if("MozTransform"in S){t="-moz-transform"}if(t){sap.ui.demokit.IndexLayout._pos=function($,x,y){$.css(t,"translate("+x+"px,"+y+"px)")}}else{sap.ui.demokit.IndexLayout._pos=function($,x,y){$.css({top:y+"px",left:x+"px"})}}}if(!this._registered){sap.ui.demokit.IndexLayout._IntervalTrigger.addListener(r,this);this._registered=true}this.$().toggleClass("sapDkIdxLayoutHidden",false)};sap.ui.demokit.IndexLayout.prototype._scale=function(v){if(!this.getEnableScaling()){return v}return Math.floor(v*this._itemScaleFactor)};function _(l,n){r.apply(l,[!n])}function r(i){if(!this.getDomRef()){this.onBeforeRendering();return}i=i||!this._registered;var l=this.$(),w=l.outerWidth(),h=l.outerHeight(),a=this._height!=h;if(this._width===w&&!a&&!i){return}this._width=w;this._height=h;var b=this.getContent().length,c=this._scale(this._itemWidth),d=this._scale(this._itemHeight),t=g(this._width,b,c),e=this._tilesPerRow!=t;this._tilesPerRow=t;if(!i){l.toggleClass("sapDkIdxLayoutAnim",true)}if(!e&&!i&&!a){return}var f=0,j=0;jQuery.sap.byId(this.getId()+"-cntnt").css({"padding-left":sap.ui.demokit.IndexLayout._MINMARGIN+"px","width":(t*c+sap.ui.demokit.IndexLayout._MINMARGIN*2)+"px","height":Math.ceil(b/t)*d}).children().each(function(k){if(k>0&&k%t===0){f=f+d;j=0}sap.ui.demokit.IndexLayout._pos(jQuery(this),j,f);j=j+c});if(i){l.css({"padding-top":sap.ui.demokit.IndexLayout._MINMARGIN+"px","padding-bottom":sap.ui.demokit.IndexLayout._MINMARGIN+"px"})}};function g(a,b,c){var t=Math.min(Math.floor((a-2*sap.ui.demokit.IndexLayout._MINMARGIN)/c),b);var d=b%t;if(d==0||b<=t){return t}function e(x){var m=b%x;return(t-x)*Math.floor(b/x)+(m!=0?(t-m):0)}var f=e(t);var h=[t];for(var i=t-1;i>=1;i--){var w=e(i);if(w<f){h=[i];f=w}else if(w==f){h.push(i)}}for(var i=0;i<h.length;i++){var m=b%h[i];if(m==0){return h[i]}else if(i==0||m>f){f=m;t=h[i]}}return t};function s(m,S){switch(m.name){case"Tablet":this._itemScaleFactor=0.75;break;case"Phone":this._itemScaleFactor=0.5;break;default:this._itemScaleFactor=1}if(!this.getDomRef()||S){return}var w=this._scale(this._itemWidth);var h=this._scale(this._itemHeight);jQuery.sap.byId(this.getId()+"-cntnt").children().each(function(){jQuery(this).css({width:w,height:h})});_(this)};sap.ui.core.Control.extend("sap.ui.demokit.IndexLayout._Tile",{metadata:{properties:{"title":"string","description":"string","target":"string","icon":"sap.ui.core.URI","href":"sap.ui.core.URI"},events:{"press":{}}},onclick:function(){if(!this.getHref()){this.firePress()}},renderer:function(R,c){R.write("<a");R.addClass("sapDkIdxLayout_Tile");R.writeClasses();R.writeControlData(c);if(c.getHref()){R.writeAttributeEscaped("href",c.getHref());if(c.getTarget()){R.writeAttributeEscaped("target",c.getTarget())}}else{R.writeAttribute("href","javascript:void(0);")}R.writeAttributeEscaped("title",c.getDescription());R.write(">");R.write("<span class='sapDkIdxLayout_TileIcon'>");R.writeIcon(c.getIcon());R.write("</span>");R.write("<span class='sapDkIdxLayout_TileLabel'");R.writeAttributeEscaped("title",c.getTitle());R.write(">");R.writeEscaped(c.getTitle());R.write("</span>");R.write("<span class='sapDkIdxLayout_TileDesc'");R.writeAttributeEscaped("title",c.getDescription());R.write(">");R.writeEscaped(c.getDescription());R.write("</span>");R.write("</a>")}})})();
