sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Ingles.Mock.MassArticle.controller.MaterialSearch", {
		onInit: function () {
			this.eventBus = sap.ui.getCore().getEventBus();
		},
		
		onSearchPress: function(ev) {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.navTo("detail", {layout: "TwoColumnsMidExpanded"});
			this.eventBus.publish("viewMassMaintenance", "DataPasing", {});
		}
	});
});