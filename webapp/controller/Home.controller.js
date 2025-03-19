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
          
            this._oODataModel = this.getOwnerComponent().getModel(); // Obtiene el modelo OData predeterminado (sin nombre) desde el manifest.json
        },
        
        onPress: async function(){

            let oFilter = [];
            let sValue = this.byId("inputID").getValue(); // Obtiene el valor ingresado por el usuario en un control de entrada (como un <Input id="inputID" />) en la vista.

            if(sValue){
                oFilter = new Filter("ProductID", FilterOperator.EQ, sValue)
            }

            let oDatos = await HomeHelper.getProposalBystatus([oFilter]); 
            await HomeHelper.setProductModel(this, oDatos[0].results);
        },

        /* onItemPress: function(oEvent) {
            let oSource = oEvent.getSource()
            let aDatos = oSource.getBindingContext("ProductCollection").getObject()
        */   

        onItemPress: function(oEvent) {
            let oSource = oEvent.getSource(); // Obtiene el objeto fuente del evento (el ColumnListItem seleccionado)
            // let oDatos = oSource.getBindingContext("ProductCollection").getObject();
            
            let oDatos = oSource.getBindingContext().getObject(); // Obtiene el contexto de binding OData y extrae el objeto de datos asociado
            // getBindingContext() devuelve un sap.ui.model.Context que representa un registro específico del entity set /Products (por ejemplo, /Products(1)).
            // getObject() convierte ese contexto en un objeto plano con las propiedades del registro.

            this.oRouter.navTo("detail", { 
                ProductID: oDatos.ProductID // Pasa el valor de ProductID como parámetro de la ruta
            });
        },

        onChange: async function(oEvent){
            let oFilter = [];
            let oSource = oEvent.getSource(); // Hacemos la lectura del control en esta caso del input 
            let oTable = this.getView().byId("idProductsTable") // Referencia de la tabla 
            let oBinding = oTable.getBinding("items"); // Obetenemos los items de la tabla 
           
            if(oSource.getValue()){
                oFilter = new Filter("ProductID", FilterOperator.EQ, oSource.getValue());               
            } 
            oBinding.filter(oFilter);    
        }


    });
});