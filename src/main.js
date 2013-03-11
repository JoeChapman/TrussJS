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

        var args = [].slice.call(arguments, 1),
                i = 0,
                len = args.length,
                namespace = {},
                item;

            for (; i < len; i++) {
                item = args[i] && args[i].prototype ? args[i].prototype.name : args[i].name;
                namespace[item] = args[i];
            }

            return namespace;

    }
);