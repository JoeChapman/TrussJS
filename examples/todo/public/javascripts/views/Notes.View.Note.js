
	var todoItem = Truss.view.construct({

		start: function (options) {

			this.parentEl = options.parentEl;
			this.model = options.model;
			this.collection = options.collection;

			this.render();

			this.button.addEventListener("click", this.delete.bind(this), false);

			this.text.addEventListener("click", this.edit.bind(this), false);

		},

		name: 'todoItem',

		edit: function () {
			todoEdit.create({
				parentEl: this.element,
				model: this.model
			});
		},

		render: function () {

			var button = this.make("button"),
				em = this.make("em", this.model.get("text") ),
				element = this.make("li",
					[em, button], {
					id: this.model.get("id"),
					draggable: true
				});

			this.text = em;
			this.button = button;
			this.element = element;

			this.parentEl.appendChild(element);
		},

		delete: function () {
			this.collection.removeById(this.model.get("id"));
			this.parentEl.removeChild(this.element);
			delete this.element;
		}

	});
