if (typeof require == "function") {
	Truss = require("../../Truss");
}

describe("Truss", function () {

	describe("Before Truss is created", function () {
		it("Should have a static construct function", function () {
			expect(typeof Truss.construct).toEqual("function");
		});
	});

	describe("When Truss is created", function () {

		var truss;

		beforeEach(function () {
			truss = new Truss();
		})

		it("Should have an on method", function () {
			expect(typeof truss.on).toEqual("function");
		});
		it("Should have an off method", function () {
			expect(typeof truss.off).toEqual("function");
		});
		it("Should have an fire method", function () {
			expect(typeof truss.fire).toEqual("function");
		});
	});
});

