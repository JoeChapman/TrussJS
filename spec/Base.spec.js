require( ['Base'], function ( Base ) {

	describe("Base", function () {

		describe("When Base has not been created", function () {

			it("Should have a static construct function", function () {
				expect(typeof Base.construct).toEqual("function");
			});

		});

		describe("When Base.construct is invoked with NO arguments", function () {

			var retVal;

			beforeEach(function () {
				retVal = Base.construct();
			});

			it("Should return a function object", function () {
				expect(typeof retVal).toEqual("function");
			});

			it("Should return a function with a static contruct function", function () {
				expect(typeof retVal.construct).toEqual("function");
			});

		});

		describe("When Base.construct is invoked with arguments", function () {

			describe("When the argument is an object with a method", function () {

				var retVal;

				beforeEach(function () {
					retVal = Base.construct({fn: function () {}});
				});

				it("Should return a function with the method on its prototype", function () {

					expect(typeof retVal.prototype.fn).toEqual("function");

				});
			});

		});

		describe("When construct is invoked on the returned function with an argument", function () {

			var retVal1;

			beforeEach(function () {
				retVal1 = Base.construct();
			});

			describe("When the argument is an object with a method", function () {

				var retVal2;

				beforeEach(function () {
					retVal2 = retVal1.construct({fn: function () {}});
				});

				it("Should return a function with the method on its prototype", function () {
					expect(typeof retVal2.prototype.fn).toEqual("function");
				});
				
			});

		});

	});

});
