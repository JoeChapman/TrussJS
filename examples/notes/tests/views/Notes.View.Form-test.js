describe("Notes.View.Form", function () {
	var view = null,
		mockCollection = {
			add: function () {}
		},
		rootNode = document.getElementById("rootNode"),
		spyCollectionAdd;

	beforeEach(function () {
		view = new Notes.View.Form({
			rootNode: rootNode, 
			collection: mockCollection
		});
	});

	afterEach(function () {
		view = null;
		rootNode.innerHTML = "";
	});

	describe("When the form is submitted with the value 'Eat Bananas'", function () {
		var value = "Eat Bananas",
			spyCollectionAdd;

		beforeEach(function () {
			spyCollectionAdd = spyOn(view.collection, "add");
			view.element.querySelector("input").setAttribute("value", value);
			view.element.querySelector("input[type=submit]").click();
		});
		it("Should add the value to the collection", function () {
			expect(spyCollectionAdd).toHaveBeenCalledWith({
				text: value
			});
		});
	});
	describe("When the form is submitted with an empty string", function () {
		var value = "",
			spyCollectionAdd;

		beforeEach(function () {
			spyCollectionAdd = spyOn(view.collection, "add");
			view.element.querySelector("input").setAttribute("value", value);
			view.element.querySelector("input[type=submit]").click();
		});
		it("Should NOT add the value to the collection", function () {
			expect(spyCollectionAdd).not.toHaveBeenCalled();
		});
	});
	describe("When the form is submitted with a string of whitespace", function () {
		var value = "     ",
			spyCollectionAdd;
		beforeEach(function () {
			spyCollectionAdd = spyOn(view.collection, "add");
			view.element.querySelector("input").setAttribute("value", value);
			view.element.querySelector("input[type=submit]").click();
		});
		it("Should NOT add the value to the collection", function () {
			expect(spyCollectionAdd).not.toHaveBeenCalled();
		});
	});
});