(function (global) {

    Truss.Mediator = Truss.construct({

        _passes: {},

        _currentEvent: null,

        /**
         * A little helper to remove duplication
         * @param type {String}
         * @param target {Object}
         * @param eventName {String}
         * @private
         */
        _add: function (type, obj, eventName) {

            this._passes[ this._currentEvent ][type].push({
                obj: obj,
                eventName: eventName
            });

        },

        /**
         * Registers the source subject subscriber and its event(s)
         * @param subscribee {Object}
         * @param eventName {String}
         * @return {this}
         */

        from: function (subscribee, eventName) {
            
            if (!arguments.length) {
                throw {
                    name: "NoArgumentsException",
                    message: "From cannot be called with no arguments"
                };
            }

            this._currentEvent = eventName || 'all';

            if ( !this._passes[ this._currentEvent ] ) {
                this._passes[ this._currentEvent ] = {};
            }

            if ( !this._passes[ this._currentEvent ].from ) {
                this._passes[ this._currentEvent ].from = [];
            }

            this._add( "from", subscribee, eventName );

            if ( this.removing ) {

                // Has to object been marked for removal??
                this._each( this._passes, function ( pass, j ) {

                    this._each( pass.to, function ( to, i) {

                        if (pass.to[i].remove && pass.to[i].remove === true) {

                            delete this._passes[j].to[i];
                            this._currentEvent = null;

                        }

                    }, this);
                }, this);

                this.removing = false;
            }

            return this;

        },


        /**
         * Adds a target subscriber by eventName to the mediator
         * @param subscriber {Object}
         * @param eventName {String}
         * @return {this}
         */
        to: function ( subscriber, eventName ) {

            if ( !this._currentEvent ) {
                throw {
                    name: "ToFunctionBadUsage",
                    message: "Cannot call to before from."
                };
            }

            if ( !this._passes[ this._currentEvent ].to ) {
                this._passes[ this._currentEvent ].to = [];
            }

            this._add( "to", subscriber, eventName );

            // No config object parameter
            this.register();

            return this;
        },

        /**
         * Marks target and eventName for removal
         * @param target {Object}
         * @param eventName {String}
         * @return {this}
         */
        remove: function (obj, eventName) {

            if (!arguments.length) {
                throw {
                    name: "NoArgumentException",
                    message: "Remove cannot be called without arguments"
                };
            }

            this.removing = true;

            this._each(this._passes, function ( pass ) {
                
                this._each( pass.to, function ( to, i ) {
                
                    if (typeof obj == "string") {

                        eventName = obj;

                        if ( to.eventName === eventName ) {
                            
                            [].splice.call(pass.to, i, 1)
                        }

                    } else {

                        if ( ( this._isEqual(to.obj, obj) || obj == null ) && ( to.eventName === eventName || typeof eventName == "undefined" ) ) {

                            to.remove = true;

                        } 
                    }

                });

            });

            return this;
        },

        _isEqual: function (a, b) {

            if (a === b) {
                return a !== 0 || 1 / a == 1 / b;
            }

            if (a == null || b == null) {
                return a === b;
            }

            if (toString.call(a) != toString.call(b)) {
                return false;
            }
        },

        /**
         * Registers the source and target subscriber objects and their events for binding
         * @param optional config Object
         */
        register: function () {

            if ( arguments.length && arguments.length === 1 ) {

                var config = arguments[0];

                if ( config.source ) {

                    this._each(config.source, function ( from ) {

                        this.from( from.subscriber, from.event );

                    }, this);

                } else {

                    throw {
                        name: "ConfigSourceNotDefined",
                        message: "Config object needs a source defined."
                    };
                }

                if ( config.target ) {

                    this._each( config.target, function (to) {

                        this.to( to.subscriber, to.event );

                    }, this);

                } else {

                    throw {
                        name: "ConfigTargetNotDefined",
                        message: "Config object needs a target defined."
                    };
                }

            } else { this._bind(); }

        },

        /**
         * Notifies mediator that target and source subscriber and events should be removed.
         * @param config {Object}
         */
        unregister: function( config ) {

            if (!arguments.length) {
                throw {
                    name: "NoArgumentException",
                    message: "Unregister cannot be called without arguments"
                };
            }

            if ( config ) {

                this.removing = true;

                if ( config.target ) {

                    this._each( config.target, function ( to ) {

                        this.remove( to.subscriber, to.event );

                    }, this );

                } else {
                    throw {
                        name: "ConfigTargetNotDefined",
                        message: "Config object needs a target defined."
                    };
                }

                if ( config.source ) {

                    this._each(config.source, function (from) {

                        this.from(from.subscriber, from.eventName);

                    }, this );

                } else {

                    throw {
                        name: "ConfigSourceNotDefined",
                        message: "Config object needs a source defined."
                    };

                }
            }

        },

        // Polyfill for nativeForEach
        _each: function (list, callback, context) {

            var i;

            // Native forEach
            if (typeof Array.prototype.forEach == "function" && list.length) {

                list.forEach( callback, context || this);

            } else if ( list.length ) {

                // Polyfill
                Array.prototype.forEach = function( callback, context ) {

                    for(var i = 0, len = list.length; i < len; ++i) {

                        callback.call(context, list[i], i, list);

                    }

                }

            } else {

                // If the list is an [object Object] (i.e. Not an Array)
                for ( i in list ) {
                    if ( list.hasOwnProperty( i )) {
                        callback.call(context || this, list[i], i, list);
                    }
                }
            }

         },

        /**
         * Bind one or more target events to one or more source events
         * @private
         */
        _bind: function () {

            this._each( this._passes[ this._currentEvent ], function (sources, type, passes) {
            
                this._each( passes, function ( sources, type, pass ) {
                
                    this._each( pass.from, function ( from ) {

                        // Remove any previous binding
                        from.obj.off( from.eventName );

                        // Bind the event to a callback
                        from.obj.on( from.eventName, function( args ) {
                        
                            this._each( pass.to, function ( to ) {

                                // The callback binds the |to| event
                                to.obj.fire( to.eventName, args);
     
                            }, this);

                        }, this);

                    }, this);

                }, this);

            }, this);

        }

    });

    // Export Truss for Node or browser
    if ("undefined" != typeof module && module.exports) {
        module.exports = Truss.Mediator;
    } else {
        global.Truss.Mediator = Truss.Mediator;
    }

}(this));