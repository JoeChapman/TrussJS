require( ['Truss.Utils'], function ( UtilsExport ) {

	var Utils = UtilsExport;

	describe("Truss.Utils", function () {

		describe("Utils.isObject", function () {

			describe("When isObject is called with an real Object", function () {
				it("Should return true", function () {
					expect(Utils.isObject({})).toEqual(true);
				});
			});
			describe("When isObject is called with an Array", function () {
				it("Should return false", function () {
					expect(Utils.isObject([])).toEqual(false);
				});
			});
			describe("When isObject is called with a Function", function () {
				it("Should return false", function () {
					expect(Utils.isObject(function () {})).toEqual(false);
				});
			});
			describe("When isObject is called with a Date", function () {
				it("Should return false", function () {
					expect(Utils.isObject(Date.now())).toEqual(false);
				});
			});
			describe("When isObject is called with a RegExp", function () {
				it("Should return false", function () {
					expect(Utils.isObject(/\d+/)).toEqual(false);
				});
			});
			describe("When isObject is called with a String", function () {
				it("Should return false", function () {
					expect(Utils.isObject("string")).toEqual(false);
				});
			});
			describe("When isObject is called with a Number", function () {
				it("Should return false", function () {
					expect(Utils.isObject(1)).toEqual(false);
				});
			});
			describe("When isObject is called with arguments", function () {
				it("Should return false", function () {
					expect(Utils.isObject(arguments)).toEqual(false);
				});
			});

		});

		describe("Utils.realTypeOf", function () {

			describe("When realTypeOf is called with an Object", function () {
				it("Should return 'object'", function () {
					expect(Utils.realTypeOf({})).toEqual("object");
				});
			});
			describe("When realTypeOf is called with an Array", function () {
				it("Should return 'array'", function () {
					expect(Utils.realTypeOf([])).toEqual("array");
				});
			});
			describe("When realTypeOf is called with a Function", function () {
				it("Should return 'function'", function () {
					expect(Utils.realTypeOf(function () {})).toEqual("function");
				});
			});
			describe("When realTypeOf is called with a String", function () {
				it("Should return 'string'", function () {
					expect(Utils.realTypeOf("string")).toEqual("string");
				});
			});
			describe("When realTypeOf is called with a Number", function () {
				it("Should return 'number'", function () {
					expect(Utils.realTypeOf(1)).toEqual("number");
				});
			});
			describe("When realTypeOf is called with a RegExp", function () {
				it("Should return 'regexp'", function () {
					expect(Utils.realTypeOf(/\d+/)).toEqual("regexp");
				});
			});
			describe("When realTypeOf is called with arguments", function () {
				it("Should return 'arguments'", function () {
					expect(Utils.realTypeOf(arguments)).toEqual("arguments");
				});
			});
		});
	});

});
