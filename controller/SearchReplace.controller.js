sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("Ingles.Mock.MassArticle.controller.SearchReplace", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Ingles.Mock.MassArticle.view.SearchReplace
		 */
		onInit: function () {
			this.eventBus = sap.ui.getCore().getEventBus();
			this.oRouter = this.getOwnerComponent().getRouter();
			
			this.getView().setModel(new JSONModel([
				{ Name: "Location Code", search: "", replace: ""}
			]), "Fields");
		},
		
		reviewMassUpdate: function() {
			this.eventBus.publish("reviewMassUpdate", "DataPasing", {});	
		},
		
		addField: function() {
			var mFields = this.getView().getModel("Fields").getData();
			mFields.push({ Name: "Location Code", search: "", replace: ""});
			this.getView().setModel(new JSONModel(mFields), "Fields");
		},
		
		cancelDetail: function() {
			this.oRouter.navTo("detail", {layout: "TwoColumnsMidExpanded"});
			this.eventBus.publish("viewMassMaintenance", "DataPasing", {});
		},
		
		removeField: function(ev) {
			var mIndex = window.parseInt(ev.getSource().getParent().getParent().getId().split("-")[2]);
			var mFields = this.getView().getModel("Fields").getData();
			mFields.splice(mIndex, 1);
			this.getView().setModel(new JSONModel(mFields), "Fields");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Ingles.Mock.MassArticle.view.SearchReplace
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Ingles.Mock.MassArticle.view.SearchReplace
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Ingles.Mock.MassArticle.view.SearchReplace
		 */
		//	onExit: function() {
		//
		//	}

	});

});