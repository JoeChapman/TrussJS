define( [
    'Base',
    'events',
    'mediator',
    'utils',
    'Collection',
    'Model',
    'View'
    ],
    function ( Base, events, mediator, utils, collection, model, view ) {

        return {
            events: events,
            mediator: mediator,
            utisl: utils,
            collection: collection,
            model: model,
            view: view
        };

    }
);