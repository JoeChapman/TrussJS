define ( ['Base', 'Model'], function ( Base, Model ) {

    function getCount () {
        return this.getModels().length;
    }

    function getBy (method, value) {
        var models = this.getModels(),
            len = models.length,
            found = [],
            i = 0;

        while (0 < len--) {
            if (typeof models[len][method] !== "undefined") {
                if (models[len][method] === value) {
                    found.push(models[len]);
                }
            } else {
                if (models[len].get(method) === value) {
                    found.push(models[len]);
                }
            }
        }
        return found = (found.length < 2) ? found[0] : found;
    }

    function removeBy (method, value) {
        var found = [].concat(getBy.call(this, method, value)),
            num = found.length,
            models = this.getModels(),
            len = models.length,
            index = -1;

        while (0 < len--) {
            while (0 < num--) {
                index = models.indexOf(found[num]);
                if (index !== -1) {
                    models.splice(index, 1);
                    this.fire("removed", this.getModels());
                }
            }
        }
    }

    var currentModel;

    // Use Base.construct to build a constructor for the Collection
    return Base.construct({

        start: function ( options ) {

            this.model = options && options.model ? options.model : Model;

        },

        models: [],

        add: function (data) {

            var items = [].concat(data),
                len = items.length,
                model,
                item,
                p,
                currentModel;

            while (len--) {

                model = items[len];

                if (model.name && model.name === 'model') {

                    this.getModels().push( model );

                } else {

                    item = items[len];

                    if ( this.model ) {

                        model = this.model();
                        this.getModels().push(model);

                        for ( p in item ) {
                            model.set( p, item[p] );
                        }

                    }
                }

                this.setCurrentModel(model);

                this.fire("add", model);
            }

        },

        reset: function () {
            this.models = [];
            this.fire("reset");
        },

        getById: function (id) {
            return getBy.call(this, "id", id);
        },

        getByText: function (text) {
            return getBy.call(this, "text", text);
        },

        removeByText: function (text) {
            removeBy.call(this, "text", text);
        },

        removeById: function (id) {
            removeBy.call(this, "id", id);
        },

        getModels: function () {
            return this.models;
        },

        setCurrentModel: function (model) {
            currentModel = model;
        },

        getCurrentModel: function () {
            return currentModel;
        }

    });

});
