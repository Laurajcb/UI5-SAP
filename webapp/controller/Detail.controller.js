sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "project/practice/utils/HomeHelper",
	"sap/ui/core/UIComponent"
], function(Controller,
	HomeHelper,
	UIComponent) {
	"use strict";

	return Controller.extend("project.practice.controller.Detail", {
        onInit(){
			let oRouter = UIComponent.getRouterFor(this)
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this)
		},
		_onObjectMatched: function(oEvent){
			let sProductID = oEvent.getParameter("arguments").ProductID

			this.getView().bindElement({
				path:"/Products(" + sProductID + ")", 
				parameters:{
					expand: "Order_Details"
				}
			})
		}
	});
});