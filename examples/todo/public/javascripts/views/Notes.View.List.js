
	var todoList = Truss.view.construct({

		start:  function (options) {

			if (!options) {
				throw {
					name: "ArgumentError",
					message: "View requires options rootNode and collection"
				};
			}

			if (!options.rootNode) {
				throw {
					name: "ArgumentError",
					message: "View requires a rootNode of type HTMLElement"
				};
			}

			if (!options.collection) {
				throw {
					name: "ArgumentError",
					message: "View requires a collection"
				};
			}
			this.tagName = "ul";

			this.rootNode = options.rootNode;
			this.collection = options.collection;
			this.collection.on("add", this._renderNote.bind(this), this);
			this.render();
		},

		render: function () {
			this.element = document.createElement(this.tagName);
			this.rootNode.appendChild(this.element);
		},

		_renderNote: function (model) {
			todoItem.create({
				parentEl: this._getElement(),
				model: model,
				collection: this._getCollection()
			});
		},

		_getCollection: function () {
			return this.collection;
		},

		_getElement: function () {
			return this.element;
		}

	});

