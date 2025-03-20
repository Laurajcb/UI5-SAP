sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "project/practice/utils/HomeHelper",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, HomeHelper, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("project.practice.controller.Home", {
        onInit() {
            console.log('Init Home')
            this.oRouter = this.getOwnerComponent().getRouter()
            this.onSearch([])
        },

        onPress: async function () {
            let oFilter = [];
            // let sValue = this.byId("inputID").getValue();
            // Obtiene el valor ingresado por el usuario en un control de entrada (como un <Input id="inputID" />) en la vista.
            //let sValueCombo = this.byId("comboboxID").getSelectedKey();

            let values = this.getOwnerComponent().getModel("LocalDataModel").getData()
            console.log(values)

            if (values.valueInput) {
                oFilter.push(new Filter("ProductName", FilterOperator.EQ, values.valueInput));
            }

            if (values.selectedKey) {
                oFilter.push(new Filter("CategoryID", FilterOperator.EQ, values.selectedKey));
            }

            this.onSearch(oFilter)
        },

        onSearch: async function (oFilter) {
            console.log("Filtros enviados:", oFilter);
            let oDatos = await HomeHelper.getDataProducts(oFilter);
            console.log("Respuesta completa de readProducts:", oDatos);
            console.log("Primer elemento de la respuesta:", oDatos[0]);
            let results = oDatos[0]?.results || oDatos[0]; // Maneja ambas posibilidades
            if (results) {
                console.log("Resultados a setear:", results);
                await HomeHelper.setProductModel(this, results);
            } else {
                console.error("No hay resultados válidos en la respuesta:", oDatos);
            }
        },

        onItemPress: function (oEvent) {
            // let oSource = oEvent.getSource(); // Obtiene el objeto fuente del evento (el ColumnListItem seleccionado)
            let oDatos = oSource.getBindingContext("ProductCollection").getObject();

            this.oRouter.navTo("detail", {
                ProductID: oDatos.ProductID // Pasa el valor de ProductID como parámetro de la ruta
            });
        },

        onChange: function (oEvent) {
            let oFilter = [];
            let oSource = oEvent.getSource();
            let oTable = this.getView().byId("idProductsTable")
            let oBinding = oTable.getBinding("items");

            if (oSource.getValue()) {
                oFilter = new Filter("ProductID", FilterOperator.EQ, oSource.getValue());
            }
            oBinding.filter(oFilter);
        },

        onSelectionChange: async function (oEvent) {

            let oFilter = [];
            let oSource = oEvent.getSource();
            let oTable = this.getView().byId("idProductsTable")
            let oBinding = oTable.getBinding("items");

            if (oSource.getSelectedKey()) {
                oFilter = new Filter("CategoryID", FilterOperator.EQ, oSource.getSelectedKey());
            }
            oBinding.filter(oFilter);

        }
    });
});