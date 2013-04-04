
    var ViewTodoCount = Truss.View.construct({

        start: function () {

            if (!this.options.collection) {
                throw new Error("View requires a collection");
            }

            this.tagName = "output";
            this.counter = 0;

            this.rootNode = this.options.rootNode;
            this.collection = this.options.collection;

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
            element = this.make("p", this.output);
            this.rootNode.appendChild(element);
        }

    });