sap.ui.controller( "view.App", {
  onInit: function() {
    //Initialize History Management
	var that = this;
	this.oEventBus = sap.ui.getCore().getEventBus();
	//subscribe(sChannelId?, sEventId, fnFunction, oListener?)
	this.oEventBus.subscribe("nav", "to", this.navTo, this);
	this.oEventBus.subscribe("nav", "back", this.navBack, this);
	
	this.oEventBus.subscribe("app", "mode", function(sChannelId, sEventId, oData) {
	        this.getView().app.setMode(oData.mode);
	    }, this);
		
    jQuery.sap.require("jquery.sap.history");
	
	jQuery.sap.history(
	   {
	      routes: [
		            {
					   page: "page",
					   handler: function(params, navType) {
					      if ( !params || !params.id) {
						       jQuery.sap.log.error("Invalid page parameter: " + params );
						  } else {
						    that.oEventBus.publish("nav", "to", {
							   viewId: params.id,
							   navType: navType
							
							});
						  
						  }
					   }
					}
				],
		  defaultHandler: function(navType) {
		        that.oEventBus.publish("nav", "to", {
				   viewId: "view.inbox.Home",
				   navType: navType
				});
		   }
		});
  },
  //back page navigation function
  navBack: function(sChannelId, sEventId, oData) {
       jQuery.sap.history.back();
	   jQuery.sap.log.info("navBack");
  },
	// This method is called for multiple purpose:
	//  1. When navigate to a new page: history state is added and page(view) is instantiated when it's loaded for the first time
	//  2. When hardware back button is tapped: do 
	
	// oData has following properties:
	// 1. viewName: the name of the view
	// 2. viewId: the id of the goint to be created instance of view
	// 3. data: this is passed to the page which is navigated to
	// 4. navType: this is the type of navigation, if this is undefined, it's a to new page navigation.  
  navTo: function( sChannelId, sEventId, oData /*id,writeHistory,navType,viewId*/ ) {
    var app = this.getView().app,
	sViewName = oData.viewName,
	sViewId = oData.viewId,
	oDataObject = oData.data,
	sNavType = oData.navType,
	oView;
  
    if(!sViewId) {
	   sViewId = sViewName;
	}
	
	var bMaster = (sViewId.indexOf("view.inbox.") !== -1);
	
	if (sNavType == jquery.sap.history.NavType.Back) {
	  if (bMaster) {
	    app.backMaster();
	  }
	} else {
	  if (!sap.ui.getCore().byId(sViewId)) {
	     //lazy view loading
		 jQuery.sap.log.info("now loading view with name '" + sViewName + "'");
		 oView = sap.ui.jsview(sViewId, sViewName);
		 (bMaster) ? app.addMasterPage(oView) : app.addDetailPage(oView);
	   }
	   (bMaster) ? app.toMaster(sViewId, oDataObject) : app.toDetail(sViewId, oDataObject);
	}
	
	//write history
	if (!sNavType && (bMaster || jQuery.device.is.phone) ) {
	    /*
		{string}	sIdf	 The identifier defined in the routes which will be matched in order to call the corresponding handler
		{object}	oStateData	 The object passed to the corresponding handler when the identifier is matched with the url hash
		{boolean}	bBookmarkable	 Default value is set to true. If this is set to false, the default handler will be called when this identifier and data are matched
		{boolean}	bVirtual?, Default:
         */
	   jQuery.sap.history.addHistory("page", {id: sViewId}, false);
    }
	
	// log
	jQuery.sap.log.info("navTo '" + sViewId + "' (" + (!sNavType && bMaster) + "," + sNavType + ")");
  }

});