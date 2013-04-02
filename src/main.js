define( [
    'Base',
    'events',
    'mediator',
    'utils',
    'Collection',
    'Model',
    'View'
    ],

    function ( Base, events, mediator, utils, Collection, Model, View ) {

        return {
            events: events,
            mediator: mediator,
            utils: utils,
            Collection: Collection,
            Model: Model,
            View: View
        };

    }
);