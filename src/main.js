define( [
    'Base',
    'events',
    'mediator',
    'utils',
    'ajax',
    'Collection',
    'Model',
    'View'
    ],

    function ( Base, events, mediator, utils, ajax, Collection, Model, View ) {

        return {
            events: events,
            mediator: mediator,
            utils: utils,
            ajax: ajax,
            Collection: Collection,
            Model: Model,
            View: View
        };

    }
);