
var ViewTodoForm = Truss.View.construct({

    start: function () {

        if (!this.options.collection) {
            throw new Error("View requires a collection");
        }

        this.rootNode = this.options.rootNode;
        this.collection = this.options.collection;
        this._makeElements();
    },

    _add: function (e) {

        e.preventDefault();
        var value = this.input.value;
        if (this._isValid(value)) {
            this.collection.add({'text': value});
        }
    },

    _isValid: function (value) {
        return (/\S/g).test(value);
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
