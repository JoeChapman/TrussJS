require( ['Truss', 'Truss.Model'], function ( Truss, Model ) {

	describe("Truss.Model", function () {

		var model = null;

		describe("When 3 new models are created without attributes", function () {
			var attributes = {
				name: "note",
				time: +Date.now()
			},
			models = [],
			count = 3;
			beforeEach(function () {
				while (0 < count--) {
					model = new Model(attributes);
					models.push(model);
				}
				count = models.length;
			});
			afterEach(function () {
				var count = models.length;
				while (0 < count--) {
					models[count].resetId();
				}
				models = [];
			});
			it("Should give each model an id incremented by 1 starting at 'mid_1'", function () {
				var countId;
				while (count--) {
					countId = count + 1;
					expect(models[count].id).toEqual("mid_" + countId);
				}
			});
		});

		describe("When 3 models are created with attributes", function () {
			var attributes = {
				name: "note",
				time: +Date.now()
			},
			models = [],
			count = 3;
			beforeEach(function () {
				while (0 < count--) {
					model = new Model(attributes);
					models.push(model);
				}
				count = models.length;
			});
			afterEach(function () {
				models = [];
			});
			it("Should give each model an id incremented by 1 starting at 'mid_1'", function () {
				var countId;
				while (count--) {
					countId = count + 1;
					expect(models[count].id).toEqual("mid_" + countId);
				}
			});
			it("Should have a property equal to each of the attributes passed in", function () {
				for (var attr in attributes) {
					expect(model.get(attr)).toEqual(attributes[attr]);
				}
			});
		});
	});
});