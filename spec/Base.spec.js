require( ['Base'], function ( Base ) {

	describe("Base", function () {

		describe("When Base has not been created", function () {

			it("Should have a static construct function", function () {
				expect(typeof Base.construct).toEqual("function");
			});

			it("Should have a static mixin function", function () {
				expect(typeof Base.mixin).toEqual("function");
			});

		});

		describe("When Base.construct is invoked with NO arguments", function () {

			var returnFunc;

			beforeEach(function () {
				returnFunc = Base.construct();
			});

			it("Should return a function object", function () {
				expect(typeof returnFunc).toEqual("function");
			});

			it("Should return a function with a static contruct function", function () {
				expect(typeof returnFunc.construct).toEqual("function");
			});

		});

		describe("When Base.construct is invoked with arguments", function () {

			describe("When the argument is an object with a method", function () {

				var returnFunc;

				beforeEach(function () {
					returnFunc = Base.construct({fn: function () {}});
				});

				it("Should return a function with the method on its prototype", function () {

					expect(typeof returnFunc.prototype.fn).toEqual("function");

				});
			});

		});

		describe("When construct is invoked on the returned function with an argument", function () {

			var returnFunc1;

			beforeEach(function () {
				returnFunc1 = Base.construct();
			});

			describe("When the argument is an object with a method", function () {

				var returnFunc2;

				beforeEach(function () {
					returnFunc2 = returnFunc1.construct({fn: function () {}});
				});

				it("Should return a function with the method on its prototype", function () {
					expect(typeof returnFunc2.prototype.fn).toEqual("function");
				});

			});

		});

	});

});
