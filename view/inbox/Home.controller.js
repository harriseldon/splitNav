sap.ui.controller("view.inbox.Home", {
  onListItemTap: function(oEvent) {
    var sTitle = oEvent.getSource().getTitle(),
	    sFilterProperty;
	if ( sTitle === "Unread" ) {
	  sFilterProperty = "unread";
	} else if (sTitle === "Important" ) {
	  sFilterProperty = "important";
	}
	
	sa.ui.getCore().getEventBus().publish("nav", "to", {
	   viewName: "view.inbox.MailInbox",
	   viewId: "view.inbox." + sTitle,
	   data: {
	     filterProperty: sFilterProperty,
		 title: sTitle
	   }
	
	});
  },
  onFooterButtonTap: function(oEvent) {
    var sId = oEvent.getSource().getId,
	    sMode;
	if( sId === "showHideButton" ) {
	  sMode = sap.m.SplitAppMode.ShowHideMode;
	} else if ( sId === "stretchButton" ) {
	  sMode = sap.m.SplitAppMode.PopoverMode;
	}
	
	if ( jQuery.device.is.landscape ) {
	  jQuery.sap.require("sap.m.MessageToast");
	  sap.m.MessageToast.show("Change to portrait to compare different modes");
	}
	sap.ui.getCore().getEventBus().publish("app", "mode", { mode: sMode } );
  }
  
});