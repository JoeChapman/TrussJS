var Truss = require("../../Truss.js");

describe("Truss", function () {

	describe("Before Truss is created", function () {
		it("Should have an extend function", function () {
			expect(typeof Truss.extend).toEqual("function");
		});
	});

	describe("Truss.extend", function () {

		var destination = {
				name: 'defaultProp', 
				hello: 'world', 
				styles: {
					width: '100px',
					height: '200px'
				}
			};

		describe("When the source is an object", function () {

			describe("When there is ONE source object", function () {

				var source = {
						name: 'sourceProp', 
						color: 'white', 
						styles: {
							width: '400px'
						}
					};

				describe("When the destination is extended with the source", function () {

					beforeEach(function () {
						Truss.extend(destination, source);
					});

					it("Should not affect destination properties that don't match source properties", function () {
						expect(destination.hello).toEqual("world");
					});
					it("Should add source properties to the destination", function () {
						expect(destination.color).toEqual("white");
					});
					it("Should override destination properties with matching source properties", function () {
						expect(destination.name).toEqual("sourceProp");
					});
					it("Should override nested destination properties with matching nested source properties", function () {
						expect(destination.styles.width).toEqual("400px");
					});
					it("Should not affect nested destination properties that don't match nested source properties", function () {
						expect(destination.styles.height).toEqual("200px");
					});
				});
			});

			describe("When there are TWO source objects", function () {
				var source = {
						name: 'sourceProp', 
						color: 'white', 
						styles: {
							width: '400px'
						}
					},
					source2 = {
						id: "second",
						name: "secondSourceProp"
					};

				describe("When the destination is extended with both source objects", function () {

					beforeEach(function () {
						Truss.extend(destination, source, source2);
					});

					it("Should add the source 2 properties to the destination", function () {
						expect(destination.id).toEqual("second");
					});
					it("Should override source 1 properties", function () {
						expect(destination.name).toEqual("secondSourceProp");
					});
				});
			});

			describe("When there are THREE source objects", function () {
				var source = {
						name: 'sourceProp', 
						color: 'white', 
						styles: {
							width: '400px'
						}
					},
					source2 = {
						id: "second",
						name: "secondSourceProp"
					};
					source3 = {
						id: "third",
						name: "thirdSourceProp"
					};

				describe("When the destination is extended with all source objects", function () {

					beforeEach(function () {
						Truss.extend(destination, source, source2, source3);
					});
					it("Should add the source 3 properties to the destination", function () {
						expect(destination.id).toEqual("third");
					});
					it("Should override source 1 and source 2 properties", function () {
						expect(destination.name).toEqual("thirdSourceProp");
					});
				});
			});

		});
		
		describe("When the source is a function constructor", function () {
			describe("When there is ONE source object", function () {

				var source = function () {
						this.name = "source", 
						this.type = "function"
					};

					source.prototype.fn = function () {};

				describe("When the destination is extended with the source", function () {

					beforeEach(function () {
						Truss.extend(destination, source);
					});

					it("Should add the constructors' own properties to the destination", function () {
						expect(destination.name).toEqual("source");
						expect(destination.type).toEqual("function");
					});
					it("Should add the prototype properties to the destination", function () {
						expect(typeof destination.fn).toEqual("function");
					});
				});
			});
		});

		describe("When there is NO source", function () {

			describe("When the destination is extended", function () {

				var applySource = {
					name: "no source"
				};

				beforeEach(function () {
					Truss.extend.call(applySource, destination);
				});

				it("Should add the properties of the object extend is invoked on to the destination", function () {
					expect(destination.name).toEqual("no source");
				});

			});
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