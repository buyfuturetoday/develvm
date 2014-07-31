/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.CarouselRenderer");sap.m.CarouselRenderer={};
sap.m.CarouselRenderer.render=function(r,c){if(!c.getVisible()){return}r.write("<div");r.writeControlData(c);r.addStyle("width",c.getWidth());r.addStyle("height",c.getHeight());r.writeStyles();r.addClass("sapMCrsl");r.addClass("sapMCrslFluid");r.writeClasses();var t=c.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.write(">");var p=c.getPages();var P=p.length;var s=c.getShowPageIndicator()?c.getPageIndicatorPlacement():null;if(s===sap.m.PlacementType.Top){this._renderPageIndicator(r,P)}r.write("<div class='sapMCrslInner'>");c._cleanUpScrollContainer();var R=function(o,i){r.write("<div class='sapMCrslItem");if(s===sap.m.PlacementType.Bottom){r.write(" sapMCrslBottomOffset")}r.write("'>");r.write("<span class='sapMCrslFirstFE' pageIndex=\""+i+"\" tabIndex=\"0\"/>");r.renderControl(c._createScrollContainer(o,i));r.write("<span class='sapMCrslLastFE' pageIndex=\""+i+"\" tabIndex=\"0\"/>");r.write("</div>")};p.forEach(R);r.write("</div>");if(sap.ui.Device.system.desktop&&P>1){r.write("<div class='sapMCrslControls sapMCrslHud'>");r.write("<a class='sapMCrslPrev' href='#' data-slide='prev' tabIndex=1><div class='sapMCrslHudInner'>");r.renderControl(c._getNavigationArrow('left'));r.write("</div></a>");r.write("<a class='sapMCrslNext' href='#' data-slide='next' tabIndex=1><div class='sapMCrslHudInner'>");r.renderControl(c._getNavigationArrow('right'));r.write("</div></a>");r.write("</div>")}if(s===sap.m.PlacementType.Bottom){this._renderPageIndicator(r,P,true)}r.write("</div>")};
sap.m.CarouselRenderer._renderPageIndicator=function(r,p,b){r.write("<div class='sapMCrslControls sapMCrslBulleted"+(b?" sapMCrslBottomOffset":"")+"'>");for(var i=1;i<=p;i++){r.write("<span data-slide="+i+">"+i+"</span>")}r.write("</div>")};
