sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("Ingles.AddOn.MaterialMassMaintenance.controller.MaterialList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Ingles.AddOn.MaterialMassMaintenance.view.MaterialList
		 */
		onInit: function () {
			this.eventBus = sap.ui.getCore().getEventBus();
			this.oRouter = this.getOwnerComponent().getRouter();

			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onProductMatched, this);
			
			this.eventBus.subscribe("reviewMassUpdate", "DataPasing", this.onMassUpdateFields, this);
			this.eventBus.subscribe("viewMassMaintenance", "DataPasing", this.onViewMassMaintenance, this);
			
			this.getView().setModel(new JSONModel({view: "View"}), "Maintenance");
			
			this.getView().setModel(new JSONModel([
				{name: "Purchasing Group = ********"},
				{name:"Merch. Category = **********"},
				{name:"Vendor = **********"},
				{name:"Material No >= **********"},
				{name:"Material No <= **********"}
			]), "filterModel");
		},
		
		isNewValue: function(oldValue, newValue) {
			return (oldValue === newValue) ? false : true;	
		},
		
		isOldValue: function(oldValue, newValue) {
			return (oldValue === newValue) ? true : false;	
		},
		
		onCancelMassUpdate: function() {
			this.onViewMassMaintenance("", "", "");                  
		},
		
		onMassUpdate: function() {
			this.onViewMassMaintenance("", "", "");                  
		},
		
		onMassUpdateFields: function(oChannel, oEvent, mData) {
			this.getView().setModel(new JSONModel({view: "Review"}), "Maintenance");	
		},
		
		onViewMassMaintenance: function(oChannel, oEvent, mData) {
			this.getView().setModel(new JSONModel({view: "View"}), "Maintenance");
		},
		
		isView: function(mData) {
			return (mData.view === "View") ? true : false;	
		},
		
		isReview: function(mData) {
			return (mData.view === "Review") ? true : false;	
		},
		
		_onProductMatched: function (oEvent) {
			this.layout = oEvent.getParameter("arguments").layout || this.layout || "TwoColumnMidExpanded";
			this.routeName = oEvent.getParameters().name;
			this.getView().setModel(new JSONModel({view: this.layout, routeName: this.routeName}), "layout");
		},
		
		isNotFullScreen: function(mLayout) {
			if(this.routeName === "detail") {
				return (mLayout === "TwoColumnsMidExpanded") ? true : false;	
			}
			return false;
		},
		
		isFullScreen: function(mLayout) {
			if(this.routeName === "detail") {
				return (mLayout === "TwoColumnsMidExpanded") ? false : true;	
			}
			return false;
		},
		
		exitFullScreen: function() {
			if(this.routeName === "detail") {
				this.oRouter.navTo("detail", {layout: "TwoColumnsMidExpanded"});
			} else if(this.routeName === "detailDetail") {
				this.oRouter.navTo("detailDetail", {layout: "TwoColumnsBeginExpanded"});
			}
		},
		
		enterFullScreen: function() {
			if(this.routeName === "detail") {
				this.oRouter.navTo("detail", {layout: "MidColumnFullScreen"});
			} else if(this.routeName === "detailDetail") {
				this.oRouter.navTo("detailDetail", {layout: "OneColumn"});
			}
		},
		
		cancelDetail: function() {
			this.oRouter.navTo("master", {layout: "OneColumn"});
		},
		
		getMaterialCount: function(mMaterials) {
			if(mMaterials && mMaterials !== null && mMaterials !== undefined) {
				if(mMaterials.length > 0) {
					return mMaterials.length + " Material" + ((mMaterials.length > 1) ?  "s" : "") + " Found"; 	
				}
			}	
			return "No Material Found!";
		},
		
		materialRowSelect: function(ev) {
			var aIndices = ev.getSource().getSelectedIndices();
			if (aIndices.length < 1) {
				this.oRouter.navTo("detail", {layout: "TwoColumnsMidExpanded"});
			} else {
				this.oRouter.navTo("detailDetail", {layout: "TwoColumnsBeginExpanded"});
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Ingles.AddOn.MaterialMassMaintenance.view.MaterialList
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Ingles.AddOn.MaterialMassMaintenance.view.MaterialList
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Ingles.AddOn.MaterialMassMaintenance.view.MaterialList
		 */
		//	onExit: function() {
		//
		//	}

	});

});