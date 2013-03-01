

	var Notes = Notes || {};
	Notes.View =  Notes.View || {};

	Notes.View.Form = Truss.View.construct({

		start: function (options) {
			this.rootNode = options.rootNode;
			this.collection = options.collection;
			this._makeElements();
		},

		_add: function (e) {
			e.preventDefault();
			var value = this.input.value;
			if (/\S/g.test(value)) {
				this.collection.add({
					text: value
				});
			}	
		},

		_makeElements: function () {
			var fieldset;

			this.submit = this.make("input", {
								type: "submit",
								value: "Add"
							});
				
			this.input = this.make("input", {
							type: 'input',
							autofocus: 'true',
							required: 'true',
							placeholder: 'Add a note...'
						});

			fieldset = this.make("fieldset", [this.input, this.submit]);

			this.element = this.make("form", fieldset, {
											action: "",
											method: "get"
										});

			this._render();
		},

		_render: function () {
			this._submitListener();
			this.rootNode.appendChild(this.element);
		},

		_submitListener: function () {
			this.submit.addEventListener("click", this._add.bind(this), false);
		}

	});
