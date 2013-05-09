
var ViewTodoForm = Truss.View.construct({

    start: function () {

        if (!this.collection) {
            throw new Error("View requires a collection");
        }

        this.makeElements();
    },

    add: function (e) {

        e.preventDefault();
        var value = this.input.value;
        if (this.isValid(value)) {
            var i = this.collection.add({'text': value});
            console.log(i);
            i.post('/note')

        }
    },

    isValid: function (value) {
        return (/\S/g).test(value);
    },

    makeElements: function () {

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

        this.render();
    },

    render: function () {
        this._submitListener();
        this.rootNode.appendChild(this.element);
    },

    _submitListener: function () {
        this.addListener("click", this.add.bind(this), this.submit);
    }

});
