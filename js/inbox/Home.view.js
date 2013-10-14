sap.ui.jsview("view.inbox.Home", {
  getControllerName: function() {
     return "view.inbox.Home";
  },
  createContent: function(oController) {
    var oInboxList = new sap.m.List( {
	  inset: true,
	  headerText: "Inbox",
	  items: [
	    new sap.m.StandardListItem( {
		  title: "All",
		  icon: "{img>icon/INBOX}",
		  activeIcon: "{img>icon/INBOX_ACTIVE}",
		  type: sap.m.ListType.Active,
		  counter: 3,
		  press: [oController.onListItemTab, oController]
		} ),
		new sap.m.StandardListItem( {
		  title: "Unread",
		  icon: "{img>icon/UNREAD}",
		  activeIcon: "{img>icon/UNREAD_ACTIVE}",
		  type: sap.m.ListType.Active,
		  counter: 2,
		  press: [oController.onListItemTab, oController]		
		
		}),
		new sap.m.StandardListItem( {
		  title: "Important",
		  icon: "{img>icon/IMPORTANT}",
		  activeIcon: "{img>icon/IMPORTANT_ACTIVE}",
		  type: sap.m.ListType.Active,
		  counter: 1,
		  press: [oController.onListItemTab, oController]		
		})
	  ]
	
	});
	
	var oRestList = new sap.m.List( {
	  inset: true,
	  items: [
	    new sap.m.StandardListItem({
		  title: "Drafts (inactive)"
		  type: sap.m.ListType.inactive
		  counter: 8
		}),
		new sap.m.StandardListItem({
		  title: "Sent Items (inactive)"
		  type: sap.m.ListType.inactive
	
		}),
		new sap.m.StanardListItem( {
		  title: "Deleted Items (inactive)"
		  type: sap.m.ListType.inactive
		
		})
	  ]
	});
	
	var oPage = new sap.m.Page({
	  icon: "{img>/icon/UI5}",
	  title: "Mail",
	  content: [oInboxList, oRestList]
	});
	
	if (!jQuery.device.is.phone) {
	  //footer to switch between modes
	  oPage.setFooter(
	    new sap.m.Bar({
		   contentMiddle: [
		     new sap.m.SegmentedButton( {
			   width: "240px",
			   buttons: [
			     new sap.m.Button("showHideButton",
				    {
					  text: "show/hide",
					  press: [oController.onFooterButtonTap, oController]
					}),
			     new sap.m.Button("stretchButton",
				    {
					  text: "stretch",
					  press: [oController.onFooterButtonTap, oController]
					}),					
			     new sap.m.Button("popoverButton",
				    {
					  text: "popover",
					  press: [oController.onFooterButtonTap, oController]
					})			   
			   ],
			   selectedButton: "showHideButton"
			 
			 })
		   ]
	  }
	  );
	}
	return oPage;
  }
  
});