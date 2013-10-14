jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");

sap.ui.app.Application.extend("Application", {
  init: function() {
     //load global data model
	 var oJSONDataModel = new sap.ui.json.JSONModel("model/data.json");
	 sap.ui.getCore().setModel(oJSONDataModel);
	 
	 //load global image source source model
	 var oImgModel = new sap.ui.model.json.JSONModel("model/img.json");
	 sap.ui.getCore().setMode(oImgMode, "img");
	 
  
  },
  main: function() {
    //create the app view and put it in the root element
	var root = this.getRoot();
	sap.ui.jsview("app", "view.App").placeAt(root);
  }

});