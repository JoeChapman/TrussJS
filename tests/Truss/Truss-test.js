describe("Truss", function () {

	describe("Before Truss is created", function () {
		it("Should have an extend function", function () {
			expect(typeof Truss.extend).toEqual("function");
		});
	});

	describe("When Truss is created", function () {
		it("Should have an on method", function () {
			expect(typeof Truss.on).toEqual("function");
		});
		it("Should have an off method", function () {
			expect(typeof Truss.off).toEqual("function");
		});
		it("Should have an fire method", function () {
			expect(typeof Truss.fire).toEqual("function");
		});
	});

});