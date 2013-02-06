var Notes = Notes || {};
Notes.View =  Notes.View || {};

Notes.View.Edit_Note = Truss.View.construct({

	start: function (options) {

		this.model = options.model;
		this.parentEl = options.parentEl;

		this.render();

		this.element.addEventListener("blur", this.update.bind(this), false);
		
	},

	render: function () {

		this.element = this.make("input", {
				autofocus: true,
				id: this.model.get("id"),
				value: this.model.get("text")
			});

		this.textEl = this.parentEl.firstChild;

		this.parentEl.replaceChild(this.element, this.parentEl.firstChild);
	},

	update: function (e) {
		// Set the new text value to the model
		this.model.set("text", e.target.value);
		// Update the text of the original element
		this.textEl.innerHTML = this.model.get("text");
		// Replace the element with the
		this.parentEl.replaceChild(this.textEl, this.element)
	}

});