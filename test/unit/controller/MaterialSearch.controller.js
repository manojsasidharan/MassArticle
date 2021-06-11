/*global QUnit*/

sap.ui.define([
	"Ingles/Mock/MassArticle/controller/MaterialSearch.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MaterialSearch Controller");

	QUnit.test("I should test the MaterialSearch controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});