describe("Notes.View.List", function () {
	var viewList = null,
		rootNode = document.getElementById("rootNode"),
		collection = {};

	beforeEach(function () {
		collection = new (Truss.Collection.construct());
	});

	describe("When a List is created without a rootNode", function () {
		it("Should throw 'View requires a rootNode of type HTMLElement'", function () {
			expect(function () {
				viewList = new Notes.View.List({collection: collection});
			}).toThrow("View requires a rootNode of type HTMLElement");
		});
	});
	describe("When a List is created without a collection", function () {
		it("Should throw 'View requires a collection'", function () {
			expect(function () {
				viewList = new Notes.View.List({rootNode: rootNode});
			}).toThrow("View requires a collection");
		});
	});
	describe("When a List is created without options", function () {
		it("Should throw 'View requires options rootNode and collection'", function () {
			expect(function () {
				viewList = new Notes.View.List();
			}).toThrow("View requires options rootNode and collection");
		});
	});
	describe("When a List is created with a rootNode and a collection", function () {
		beforeEach(function () {
			viewList = new Notes.View.List({
				rootNode: rootNode, 
				collection: collection
			});	
		});

		afterEach(function () {
			collection = {};
			viewList = null;
		});

		describe("When a list is created", function () {
			it("Should render a list element to the rootNode", function () {
				expect(rootNode.firstChild).toEqual(viewList._getElement());
			});
		});
		describe("When a collection fires an 'add' event with a new note", function () {
			var note = {text: "Eat more Bananas", id: "note_1"},
				element, 
				spyViewNote,
				spyGetCollection,
				params = {
					collection: collection,
					parentEl: null,
					model: note
				};

			beforeEach(function () {
				spyViewNote = spyOn(Notes.View, "Note");

				spyGetCollection = spyOn(viewList, "_getCollection").andCallFake(function () {
					return params.collection;
				});
				params.parentEl = viewList._getElement();
				viewList.collection.fire("add", note);
			});
			it("Should create a new note with the list element, and the collection", function () {
				expect(spyViewNote).toHaveBeenCalledWith(params);
			});

		});
	});

});

