describe("Notes.View.Note", function () {
	var viewNote = null,
		parentEl = document.querySelector("ul"),
		mockModel = {
			attributes: {
				text: "Eat more Bananas", 
			},
			id: "note_1",
			get: function (name) {
				return this.attributes[name];
			}
		},
		mockCollection = {
			removeById: function () {}
		};

	beforeEach(function () {
		viewNote = new Notes.View.Note({
			parentEl: parentEl,
			model: mockModel, 
			collection: mockCollection
		});
	});
	afterEach(function () {
		parentEl.innerHTML = "";
		viewNote = null;
	});

	describe("When a note is created", function () {
		it("Should make a new note with the text 'Eat more Bananas'", function () {
			expect(viewNote.element.innerText).toEqual(mockModel.attributes.text);
		});
		it("Should make a new note with the id 'note_1'", function () {
			expect(viewNote.element.id).toEqual(mockModel.id);
		});
		it("Should make a new note with a delete button'", function () {
			expect(viewNote.element.getElementsByTagName("button").length).toEqual(1);
		});
	});

	describe("When a notes' button is clicked", function () {
		var spyCollectionRemoveById;
		beforeEach(function () {
			spyCollectionRemoveById = spyOn(viewNote.collection, "removeById");
			viewNote.button.click();
		});
		it("Should destroy the note", function () {
			expect(viewNote.element).toEqual(null);
		});
		it("Should remove the note with id 'note_1' from the collection", function () {
			expect(spyCollectionRemoveById).toHaveBeenCalledWith(viewNote.id);
		});
	});

});

