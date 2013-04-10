
    var ViewTodoCount = Truss.View.construct({

        tagName: 'output',

        start: function () {

            if (!this.collection) {
                throw new Error("View requires a collection");
            }

            this.counter = 0;

            this.render();
            this.collection.on("add", this.increment.bind(this));
            this.collection.on("removed", this.decrement.bind(this));
        },

        increment: function (model) {
            this.output.innerHTML = this.collection.getModels().length;
        },

        decrement: function (models) {
            this.output.innerHTML = models.length;
        },

        render: function () {
            var element;
            this.output = this.make(this.tagName, this.counter);
            this.setElement(this.make("p", this.output));
            this.rootNode.appendChild(this.element);
        }

    });