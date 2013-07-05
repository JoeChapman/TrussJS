define(['Base', 'ajax'], function ( Base, ajax ) {

    var constants = {
            ID: 1,
            ORIGID: 1,
            IDPREFIX: "mid_"
        };

    function getNewId () {
        return constants.IDPREFIX + constants.ID++;
    }

    function resetId () {
        constants.ID = constants.ORIGID;
    }

    return Base.construct({

        start: function (options) {
            this.resetId = resetId;
            this.id = getNewId();
            this.properties = Base.mixin({}, {id: this.id});

            if (options) {
                this.set(options);
            }

            return this;
        },

        get: function ( name ) {
            return this[ name ] || this.properties[ name ];
        },

        set: function ( name, value ) {
            if ( this.isString(name) ) {
                this.properties[ name ] = value;
            } else {
                for (var n in name) {
                    if  (name.hasOwnProperty(n) ) {
                        this.properties[ n ] = name[n];
                    }
                }
            }
        },

        remove: function () {
            this.post({url: '/delete'});
        }

    });

});
