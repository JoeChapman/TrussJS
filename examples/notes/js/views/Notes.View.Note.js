var Notes = Notes || {};
Notes.View =  Notes.View || {};

Notes.View.Note = Truss.View.construct({

	start: function (options) {

		this.parentEl = options.parentEl;
		this.id = options.model.id;

		this.render(options.model);
		
		this.collection = options.collection;
		this.button.addEventListener("click", this.delete.bind(this), false);
	},
	render: function (model) {
		var button = this.make("button"),
			element = this.make("li", 
				[this.make("em", model.get("text")), button], {
				id: this.id,
				draggable: true
			});

		this.button = button;
		this.element = element;

		this.parentEl.appendChild(element);
	},

	delete: function () {
		this.collection.removeById(this.id);
		this.parentEl.removeChild(this.element);
		delete this.element;
	}

});