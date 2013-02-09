require( ['src/Truss', 'src/Truss.Collection', 'src/Truss.Model'], 
	function ( TrussExport, CollectionExport, ModelExport ) {

	var Truss = TrussExport.Truss;
	var Collection = CollectionExport.Collection;

	// TODO - stub Model
	var Model = ModelExport.Model;

	describe("Truss.Collection", function () {
		var collection = null;

		describe("When a collection is created without options", function () {
			it("Should not throw an error", function () {
				expect(function () {
					collection = new Collection();
				}).not.toThrow();
			});
		});
		describe("When a collection is created without a model", function () {
			beforeEach(function () {
				collection = new Collection();
			});
			afterEach(function () {
				collection.currentModel.resetId();
				collection = null;
			});
			describe("When a collection recieves 1 new object", function () {
				var spyFire,
					obj = {text: "I like Mangoes"};

				beforeEach(function () {
					spyFire = spyOn(collection, "fire");
					collection.add(obj);
				});
				it("Should fire an 'add' event with a new model", function () {
					expect(spyFire).toHaveBeenCalledWith("add", collection.getById("mid_1"));
				});
			});
		});
		describe("When a collection is created with a model", function () {
			beforeEach(function () {
				collection = new Collection({
					model: Model
				});
			});
			afterEach(function () {
				collection.currentModel.resetId();
				collection = null;
			});
			describe("When a collection recieves 1 new object", function () {
				var spyFire,
					obj = {text: "I like Mangoes"};

				beforeEach(function () {
					collection.reset();
					spyFire = spyOn(collection, "fire");
					collection.add(obj);
				});
				it("Should fire an 'add' event with the new model", function () {
					expect(spyFire).toHaveBeenCalledWith("add", collection.getById("mid_1"));
				});
			});
			describe("When a collection recieves two new objects", function () {
				var spyFire,
					obj1 = {text: "I like Mangoes"},
					obj2 = {text: "I like Bananas"};

				beforeEach(function () {
					collection.reset();
					spyFire = spyOn(collection, "fire");
					collection.add([obj1, obj2]);
				});
				it("Should fire the 'add' event twice", function () {
					expect(spyFire.callCount).toEqual(2);
				});
				it("Should fire an 'add' event with a new model for obj1", function () {
					expect(spyFire).toHaveBeenCalledWith("add", collection.getById("mid_1"));
				});
				it("Should fire an 'add' event with a new model for obj2", function () {
					expect(spyFire).toHaveBeenCalledWith("add", collection.getById("mid_2"));
				});
			});
			describe("When the collection has 2  models", function () {
				var obj1 = {text: "I like Mangoes"},
					obj2 = {text: "I like Bananas"},
					spyFire;

				beforeEach(function () {
					collection.reset();
					spyFire = spyOn(collection, "fire");
					collection.add([obj1, obj2]);
				});
				describe("When a removedById is called with by the id of the first model", function () {
					beforeEach(function () {
						collection.removeById("mid_1");
					});
					it("Should remove the model with the id 'mid_1' from the collection", function () {
						expect(typeof collection.getById("mid_1")).toBe("undefined");
					});
					it("Should NOT remove the model with the id 'mid_2' from the collection", function () {
						expect(typeof collection.getById("mid_2")).toBe("object");
					});
					it("Should still have 1 model", function () {
						expect(collection.getModels().length).toEqual(1);
					});
					it("Should fire 1 'removed' event with a list of the remaining models", function () {
						expect(spyFire.mostRecentCall.args).toEqual(["removed", [collection.getById("mid_2")]]);
					});
				});
			});
			describe("When the collection has 3 models", function () {
				describe("When 2 of the models have the same text", function () {
					var obj1 = {text: "I like Mangoes"},
						obj2 = {text: "I like Bananas"},
						obj3 = {text: "I like Bananas"},
						spyFire;

					beforeEach(function () {
						collection.reset();
						spyFire = spyOn(collection, "fire");
						collection.add([obj1, obj2, obj3]);
					});
					describe("When removeByText is called with 'I like Bananas'", function () {
						beforeEach(function () {
							collection.removeByText("I like Bananas");
						});
						it("Should remove the models with the text 'I like Bananas' from the collection", function () {
							expect(typeof collection.getByText("I like Bananas")).toEqual("undefined");
						});
						it("Should NOT remove the model with the text 'I like Mangoes' from the collection", function () {
							expect(typeof collection.getByText("I like Mangoes")).toEqual("object");
						});
						it("Should still have 1 model", function () {
							expect(collection.getModels().length).toEqual(1);
						});
						it("Should fire a 'removed' event with the remaining models", function () {
							expect(spyFire.mostRecentCall.args).toEqual(["removed", collection.getModels()]);
						});
					});
				});
			});
			describe("When the collection has 6 models", function () {
				var note1 = {text: "I like Mangoes"},
					note2 = {text: "I like Bananas"},
					note3 = {text: "I like Apples"},
					note4 = {text: "I like Mangoes"},
					note5 = {text: "I like Houmous"},
					note6 = {text: "I like Olives"},
					spyFire;

				beforeEach(function () {
					spyFire = spyOn(collection, "fire");
					collection.add([note1, note2, note3, note4, note5, note6]);
				});
				describe("When the collection is reset", function () {
					beforeEach(function () {
						collection.reset();
					});
					it("Should remove all the models", function () {
						expect(collection.getModels().length).toEqual(0);
					});
					it("Should fire a reset event", function () {
						expect(spyFire).toHaveBeenCalledWith("reset");
					});
				});
			});
		});
	});
});