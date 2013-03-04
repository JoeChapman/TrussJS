
	var Notes = Notes || {};
	Notes.View =  Notes.View || {};

	Notes.View.Count = Truss.View.construct({

		start: function (options) {

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

			this.tagName = "output";
			this.counter = 0;

			this.rootNode = options.rootNode;
			this.collection = options.collection;

			this._render();
			this.collection.on("add", this._increment.bind(this));
			this.collection.on("removed", this._decrement.bind(this));
		},

		_increment: function (model) {
			this.output.innerHTML = this.collection.getModels().length;
		},

		_decrement: function (models) {
			this.output.innerHTML = models.length;
		},

		_render: function () {
			var element;
			this.output = this.make(this.tagName, this.counter);
			element = this.make("p", this.output)
			this.rootNode.appendChild(element);
		}

	});