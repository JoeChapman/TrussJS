
	var todoForm = Truss.View.construct({

		start: function (options) {
			console.log( 'in start', options );
			this.rootNode = options.rootNode;
			this.collection = options.collection;
			this._makeElements();
		},

		name: 'formView',

		_add: function (e) {

			e.preventDefault();
			var value = this.input.value;
			if (/\S/g.test(value)) {

				//var model = Truss.Model.construct({});
				//model.set('text', value);
				this.collection.add({'text': value});

			}
		},

		_makeElements: function () {

			var fieldset;

			this.submit = this.make("input", {
								type: "submit",
								value: "Add"
							});

			this.input = this.make("input", {
							type: 'text',
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
