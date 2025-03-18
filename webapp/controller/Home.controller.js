sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "project/practice/utils/HomeHelper"
], (Controller, HomeHelper) => {
    "use strict";

    return Controller.extend("project.practice.controller.Home", {
        onInit() {
            console.log('Init Home')
            this.oRouter = this.getOwnerComponent().getRouter()
        },
        onPress: async function(){
            let oDatos = await HomeHelper.getDataProducts(); 
            await HomeHelper.setProductModel(this, oDatos[0].results);
        },
        onItemPress: function(oEvent) {
            console.log("item press")
            let oSource = oEvent.getSource()
            let aDatos = oSource.getBindingContext("ProductCollection").getObject()

            this.oRouter.navTo("detail", {
                ProductID: aDatos.ProductID
            })
        }

    });
});