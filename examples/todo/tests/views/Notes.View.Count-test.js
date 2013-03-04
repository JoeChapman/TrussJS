describe("Notes.View.Count", function () {
	var viewCount = null,
		collection = null,
		rootNode = document.getElementById("rootNode");

	beforeEach(function () {
		collection = new (Truss.Collection.construct());
	});

	describe("When a Count is created without a rootNode", function () {
		it("Should throw 'View requires a rootNode of type HTMLElement'", function () {
			expect(function () {
				viewCount = new Notes.View.Count({collection: collection});
			}).toThrow("View requires a rootNode of type HTMLElement");
		});
	});
	describe("When a Count view is created without a collection", function () {
		it("Should throw 'View requires a collection'", function () {
			expect(function () {
				viewCount = new Notes.View.Count({rootNode: rootNode});
			}).toThrow("View requires a collection");
		});
	});
	describe("When a Count view is created without options", function () {
		it("Should throw View requires options rootNode and collection", function () {
			expect(function () {
				viewCount = new Notes.View.Count();
			}).toThrow("View requires options rootNode and collection");
		});
	});

	describe("When the Count is created with a rootNode and collection", function () {
		beforeEach(function () {
			viewCount = new Notes.View.Count({
				rootNode: rootNode, 
				collection: collection
			});
		});
		afterEach(function () {
			viewCount = null;
			rootNode.innerHTML = "";
		});
		describe("When the count has not updated", function () {
			it("Should display '0' as the count", function () {
				expect(viewCount.output.innerHTML).toEqual("0");
			});
		});
		describe("When the collection has 1 model added and fires an 'add' event", function () {
			beforeEach(function () {
				viewCount.collection.models = [{text: "text", id: "model_1"}];
				viewCount.collection.fire("add", viewCount.collection.models);
			});
			it("Should update the count output to '1'", function () {
				expect(viewCount.output.innerHTML).toEqual("1");
			});
		});
		describe("When the collection has 2 models and fires an 'add' event", function () {
			beforeEach(function () {
				viewCount.collection.models = [
					{text: "text1", id: "model_1"},
					{text: "text2", id: "model_2"}
				];
				viewCount.collection.fire("add", viewCount.collection.models);
			});
			describe("When the count has been updated", function () {
				it("Should update the count output to '2'", function () {
					expect(viewCount.output.innerHTML).toEqual("2");
				});
			})
			describe("When 1 model is then removed and the collection fires a 'removed' event", function () {
				beforeEach(function () {
					viewCount.collection.models = [{text: "text", id: "model_1"}];
					viewCount.collection.fire("removed", viewCount.collection.models);
				});
				it("Should decrement the count output to '1'", function () {
					expect(viewCount.output.innerHTML).toEqual("1");
				});
			});
		});
	})
});