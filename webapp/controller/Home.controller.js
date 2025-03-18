sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "project/practice/utils/HomeHelper"
], (Controller, HomeHelper) => {
    "use strict";

    return Controller.extend("project.practice.controller.Home", {
        onInit() {
            console.log('Init Home')
        },
        onPress: async function(){
            let oDatos = await HomeHelper.getDataProducts(); 
            await HomeHelper.setProductModel(this, oDatos[0].results);
        }
    });
});