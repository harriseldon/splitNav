sap.ui.jsview("view.App", {
  getControllerName: function() {
      return "view.App";
   },
   
   createContent: function(oController) {
        // to avoid scrollbars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		// create app
		this.app = new sap.m.SplitApp({
			//The master area needs to be closed when navigation in detail area is done.
			afterDetailNavigate: function(){
				this.hideMaster();
			},
			homeIcon : {
				'phone' : 'img/57_iPhone_Desktop_Launch.png',
				'phone@2' : 'img/114_iPhone-Retina_Web_Clip.png',
				'tablet' : 'img/72_iPad_Desktop_Launch.png',
				'tablet@2' : 'img/144_iPad_Retina_Web_Clip.png',
				'favicon' : 'img/favicon.ico',
				'precomposed': false
			}
		});
		
		// create the first page in both master and detail areas 
		this.app.addDetailPage(sap.ui.jsview("view.detail.Empty", "view.detail.Empty"));
		this.app.addMasterPage(sap.ui.jsview("view.inbox.Home", "view.inbox.Home"));
		
		// navigate to the first page in both master and detail areas.
		// the toMaster must be called after calling the toDetail, because both of them point to the same reference in phone and 
		// the real first page that will be shown in phone is the page in master area. 
		this.app.toDetail("view.detail.Empty");
		this.app.toMaster("view.inbox.Home");
		
		// done
		return this.app;      
   
   }


});