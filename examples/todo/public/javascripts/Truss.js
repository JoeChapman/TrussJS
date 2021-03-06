(function(global, define) {
  var globalDefine = global.define;

/**
 * almond 0.2.5 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        if (config.deps) {
            req(config.deps, config.callback);
        }
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());
define("vendor/almond", function(){});

define ('events',[], function ( ) {  return {    events: {},    on: function (event, callback) {      var context;      if ( "string" != typeof event ) {        throw new Error("on() needs an event name string");      }      if ( "function" != typeof callback ) {        throw new Error("on() needs a callback function");      }      context = [].slice.call( arguments, 2 )[0];      if ( !this.events[event] ) {        this.events[event] = [];      }      this.events[event].push({        callback: callback,        context: context      });    },    reset: function () {      this.events = {};    },    off: function (event) {      var ev, len, cb;      // Event must be a string      if ( "string" != typeof event ) {        throw new Error( "off() needs an event" );      }      cb = [].slice.call( arguments, 1 )[0];      // If the event has been registered      if ( this.events[event] ) {        ev = this.events[event];        len = ev.length;        // Loop over each event object that matches ours.        while ( len-- ) {          if ( "function" != typeof cb ) {            // If no callback was given, remove the event            // and all its callbacks            ev.splice(len, 1);          } else {            // If a callback was passed,            // remove the callback from the event            if ( ev[len].callback === cb ) {              ev[len].callback = null;              delete ev[len].callback;            }          }        }      }    },    fire: function ( event ) {      var ev, len, opt, data, ctx;      // event argument is mandatory      if ( "string" != typeof event ) {        throw new Error("fire() needs an event");      }      // Optional arguments      opt = [].slice.call( arguments, 1 );      data = opt[0];      ctx = opt[1];      // If this event has been registered      if ( this.events[event] ) {        len = this.events[event].length;        // Invoke the callback on each event object        while ( ev = this.events[event][--len] ) {          if ("function" == typeof ev.callback) {            // Invoke in either context with data if present            ev.callback.call( ( ctx || ev.context || this ), data );          }        }      }    }  };});
define('utils',[], function ( ) {

  return {

    realTypeOf: function ( value ) {
      // Borrow Object.toString to introspect the
      // class definition of the value i.e. ([object Object])
      // and return the latter portion which denotes
      // the real type of value.
      return ({}).toString.call(value).match( /\w+/g )[1].toLowerCase();
    },

    isObject: function ( value ) {
      //delegate to realTypeOf
      return this.realTypeOf(value) === 'object';
    },

    isArray: function ( value ) {
      if (Array.isArray) {
        return Array.isArray(value);
      }
      //delegate to realTypeOf if isArray is not supported
      return this.realTypeOf(value) === 'array';
    },

    isString: function ( value ) {
      //delegate to realTypeOf
      return this.realTypeOf(value) === 'string';
    },

    isNumber: function ( value ) {
      //delegate to realTypeOf
      return this.realTypeOf(value) === 'number';
    },

    isFunction: function ( value ) {
      //delegate to realTypeOf
      return this.realTypeOf(value) === 'function';
    },

    mixin: function ( dest ) {

      var src, prop, sources = [].slice.call(arguments, 1);

      while (src = sources.shift()) {
        // Iterate over all src properties
        for (prop in src) {
          if (src.hasOwnProperty(prop)) {
            if ( this.isObject(src[prop])  ) {
              dest[prop] = dest[prop] || src[prop];
              this.mixin(dest[prop], src[prop]);
            } else {
              // Assign the value form the src to the destination
              dest[prop] = src[prop];
            }
          }
        }

      }

      return dest;
    }

  };

});
define('ajax', ['utils'], function (utils) {

    var ajax = {

        xhr: (function () {

            var xhr;

            if (window.XMLHttpRequest) {
                xhr = new window.XMLHttpRequest();
            } else if (window.ActiveXObject) {
                try {
                    xhr = new window.ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                    try {
                        xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
                    }
                    catch (e) {}
                }
            }

            xhr.onreadystatechange = function (res) {
                ajax.response(res);
            };

            return xhr;

        }()),

        mimeType: 'text/plain',

        response: function(res) {
            try {
                if (res.readyState === 4) {
                    if (res.statusCode === 200) {
                        this.success(res);
                        this.fire('ajax:success', res.target.response);
                    } else {
                        this.failure(res);
                    }
                }
            } catch( e ) {
                this.error(e);
            }
        },

        setHeaders: function (data) {
            if (data && utils.isString(data)) {
                try {
                    utils.isObject(JSON.parse(data));
                    this.mimeType = "application/json";
                } catch (e) {}
            }
            this.xhr.setRequestHeader( "Content-Type", this.mimeType );
        },

        request: function (method, options) {
            this.setOptions(options);
            this.xhr.open(method, this.url, true);
            this.setHeaders(this.data);
            this.xhr.send(this.data || null);
        },

        setOptions: function (options) {
            utils.mixin(this, options);
        },

        update: function (options) {
            this.request('GET', options);
        },

        post: function (options) {
            if (!options.data && this.properties) {
                options.data = JSON.stringify(this.properties);
            }
            this.request('POST', options);
        },

        success: function () {},

        failure: function () {},

        error: function (e) {}

    };

    return ajax;

});


define('Base', ['events', 'utils', 'ajax'], function ( events, utils, ajax ) {

  /**
   * @constructor
   * @description
   * -> Core of Base framework
   * @param {Object} options
   * @return {this}
   */
  var Base = function ( options ) {

    // Add any arguments to this.options
    if ( "undefined" != typeof options ) {
        this.options = options;
        Base.mixin(this, options);
    }

    // Call the start function to do any setup
    if ( this.isFunction(this.start) ) {
        this.start();
    }

  };

  /**
   * @static
   * @description
   * -> Takes object params and adds all object properties to the first (dest) param.
   * @param {Object} dest
   * @param {Object} src
   * @return {Object} augmented dest
   */
  Base.mixin = function ( dest ) {

    var src, prop, sources = [].slice.call(arguments, 1);

    while(src = sources.shift()) {
      // Iterate over all src properties
      for (prop in src) {
        if (src.hasOwnProperty(prop)) {
          if ( utils.isObject(src[prop])  ) {
            dest[prop] = dest[prop] || src[prop];
            Base.mixin(dest[prop], src[prop]);
          } else {
            // Assign the value form the src to the destination
            dest[prop] = src[prop];
          }
        }
      }

    }

    return dest;
  };

  /**
   * @static
   * @description
   * -> Construct is a static inheritance function
   * @return {Function} constructor function
   */
  Base.construct = function (properties) {

    var parent = this,
        props = properties || {};

    function F () {}
    F.prototype = parent.prototype;
    F.prototype.constructor = Base.mixin( F, parent );

    function create (options) {
        var proto = getPrototype();
        Base.call(proto, options);
        return proto;
    }

    function getPrototype() {
      var proto = proto || Base.mixin( new F(), props );
      return proto;
    }

    function proxy () {}
    proxy.prototype = getPrototype();
    proxy.construct = F.construct;
    proxy.create = create;

    return proxy;

  };

  // Augment the Base prototype with events, and utils mixins;
  Base.mixin(Base.prototype, events, utils, ajax);

  // Return Base as the module definition
  return Base;

});
define('mediator',[], function ( ) {    /**        * A little helper to remove duplication        * @param type {String} to|from        * @param obj {Object}        * @param eventName {String}        * @private        */    function add (type, obj, eventName) {        passes[ currentEvent ][ type ].push({            obj: obj,            eventName: eventName        });    }    function isEqual (a, b) {        if (a === b) {            return a !== 0 || 1 / a === 1 / b;        }        if (a === null || b === null) {            return a === b;        }        if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {            return false;        }    }    // Polyfill for nativeForEach    function each (list, callback, context) {        var i;        // Native forEach        if (typeof Array.prototype.forEach == "function" && list.length) {            list.forEach( callback, context || this);        } else if ( list.length ) {            // Polyfill            Array.prototype.forEach = function( callback, context ) {                for (var i = 0, len = list.length; i < len; ++i) {                    callback.call(context, list[i], i, list);                }            };        } else {            // If the list is an [object Object] (i.e. Not an Array)            for ( i in list ) {                if ( list.hasOwnProperty( i ) ) {                    callback.call( context || this, list[i], i, list );                }            }        }    }    /**    * Bind one or more target events to one or more source events    * @private    */    function bind () {        each( passes[ currentEvent ], function (sources, type, passes) {            each( passes, function ( sources, type, pass ) {                each( pass.from, function ( from ) {                    // Remove any previous binding                    from.obj.off( from.eventName );                    // Bind the event to a callback                    from.obj.on( from.eventName, function( args ) {                        each( pass.to, function ( to ) {                            // The callback binds the |to| event                            to.obj.fire( to.eventName, args);                        }, this);                    }, this);                }, this);            }, this);        }, this);    }    var passes = {},        currentEvent = null;    // Return medaitor api as module definition    return {        /**        * Registers the source subject subscriber and its event(s)        * @param subscribee {Object}        * @param eventName {String}        * @return {this}        */        from: function (subscribee, eventName) {            if (!arguments.length) {                throw {                    name: "NoArgumentsException",                    message: "From cannot be called with no arguments"                };            }            currentEvent = eventName || 'all';            if ( !passes[ currentEvent ] ) {                passes[ currentEvent ] = {};            }            if ( !passes[ currentEvent ].from ) {                passes[ currentEvent ].from = [];            }            add( "from", subscribee, eventName );            if ( this.removing ) {                // Has to object been marked for removal??                each( passes, function ( pass, j ) {                    each( pass.to, function ( to, i) {                        if (pass.to[i].remove && pass.to[i].remove === true) {                            // Dedlete the target object and event,                            // null the currentEvent                            delete passes[j].to[i];                            currentEvent = null;                        }                    }, this);                }, this);                this.removing = false;            }            // Make it chainable            return this;        },        /**        * Adds a target subscriber by eventName to the mediator        * @param subscriber {Object}        * @param eventName {String}        * @return {this}        */        to: function ( subscriber, eventName ) {            if ( !currentEvent ) {                throw {                    name: "ToFunctionBadUsage",                    message: "Cannot call to before from."                };            }            if ( !passes[ currentEvent ].to ) {                passes[ currentEvent ].to = [];            }            add( "to", subscriber, eventName );            // No config object parameter            this.register();            // Make it chainable            return this;        },        /**        * Marks target and eventName for removal        * @param target {Object}        * @param eventName {String}        * @return {this}        */        remove: function (obj, eventName) {            if (!arguments.length) {                throw {                    name: "NoArgumentException",                    message: "Remove cannot be called without arguments"                };            }            this.removing = true;            each(passes, function ( pass ) {                each( pass.to, function ( to, i ) {                    if (typeof obj == "string") {                        eventName = obj;                        if ( to.eventName === eventName ) {                            [].splice.call(pass.to, i, 1);                        }                    } else {                        if ( ( isEqual(to.obj, obj) || obj == null ) && ( to.eventName === eventName || typeof eventName == "undefined" ) ) {                            to.remove = true;                        }                    }                });            });            return this;        },        /**        * Registers the source and target subscriber objects and their events for binding        * @param optional config Object        */        register: function () {            var config = arguments[0];            if ( config ) {                if ( config.source ) {                    each(config.source, function ( from ) {                        this.from( from.subscriber, from.event );                    }, this);                } else {                    throw {                        name: "ConfigSourceNotDefined",                        message: "Config object needs a source defined."                    };                }                if ( config.target ) {                    each( config.target, function (to) {                        this.to( to.subscriber, to.event );                    }, this);                } else {                    throw {                        name: "ConfigTargetNotDefined",                        message: "Config object needs a target defined."                    };                }            } else {                bind();            }        },        /**        * Notifies mediator that target and source subscriber and events should be removed.        * @param config {Object}        */        unregister: function ( config ) {            if ( !config ) {                throw {                    name: "NoArgumentException",                    message: "Unregister cannot be called without arguments"                };            }            if ( config ) {                this.removing = true;                if ( config.target ) {                    each( config.target, function ( to ) {                    this.remove( to.subscriber, to.event );                    }, this );                } else {                    throw {                        name: "ConfigTargetNotDefined",                        message: "Config object needs a target defined."                    };                }                if ( config.source ) {                    each(config.source, function (from) {                        this.from(from.subscriber, from.eventName);                    }, this );                } else {                    throw {                        name: "ConfigSourceNotDefined",                        message: "Config object needs a source defined."                    };                }            }        }    };});
define('Model',['Base', 'ajax'], function ( Base, ajax ) {

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

define ('Collection', ['Base', 'Model', 'ajax'], function ( Base, Model, ajax ) {

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
                    found[num].remove();
                    this.fire("removed", this.getModels());
                }
            }
        }
    }

    var currentModel;

    // Use Base.construct to build a constructor for the Collection
    var collection =  Base.construct({

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

                if (this.isFunction(model.set)) {

                    this.getModels().push( model );

                } else {

                    item = items[len];

                    if ( this.isFunction(this.model) ) {

                        model = this.model.create();
                        this.getModels().push(model);

                        for ( p in item ) {
                            model.set( p, item[p] );
                        }

                    }
                }

                this.setCurrentModel(model);

                this.fire("add", model);
            }

            return model;

        },

        hydrate: function (options) {
            this.update(options);
            this.on('ajax:success', function (res) {
                this.add(JSON.parse(res));
            }.bind(this));
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


    return collection;

});

define ('View',['Base'], function ( Base ) {    // Build the constructor    return Base.construct({        tagName: 'div',        start: function () {            this.tagName = this.options && this.options.tagName ? this.options.tagName : this.tagName;        },        setElement: function (element) {            this.element = element;        },        removeElement: function () {            if (arguments[0] && arguments[0].nodeType === 1) {                this.setElement(arguments[0]);            }            if (this.element.parentNode) {                this.element.parentNode.removeChild(this.element);            }            this.stopListening();            this.element = null;            delete this.element;        },        destroy: function () {            if (this.model || this.collection) {                if (this.collection) {                    this.collection.removeById(this.model.get("id"));                } else {                    this.model.remove();                }            }            this.removeElement();        },        replaceElement: function (replacement) {            var replacee = this.element;            if (arguments[1] && arguments[1].nodeType === 1) {                replacee = arguments[1];            }            if (replacee && replacee.parentNode) {                this.oldElement = replacee.parentNode.replaceChild(replacement, replacee);            }        },        addListener: function (eventName, handler) {            var el = arguments[2] && arguments[2].nodeType === 1 ? arguments[2] : this.element;            if (el.addEventListener) {                var evt = eventName.type || eventName;                el.addEventListener(evt, function (e) {                    if (eventName.key && (eventName.key == e.keyCode)) {                        handler(e);                    } else if (!eventName.key) {                        handler(e);                    }                });            }        },        stopListening: function () {            this.element.removeEventListener('*');        },        make: function () {            // All arguments are optional            var args = [].slice.call(arguments),                name = args[0] || this.tagName,                contents = args[1],                attrs = args[2],                i,                attr,                tag = document.createElement(name);            if (args.length === 2 && this.isObject(contents)) {                contents = undefined;                attrs = args[1];            }            // Add the contents            if (typeof contents !== "undefined") {                if (this.isNumber(contents) || this.isString(contents)) {                    // If the contents is a Number or a String,                    // parse it to a textnode                    contents = document.createTextNode(contents);                }                if (this.isArray(contents)) {                    // If our contents is an array,                    // append each one to the tag                    while ( i = contents.shift() ) {                        tag.appendChild(i);                    }                } else {                    tag.appendChild(contents);                }            }            // Add the attributes            if ( attrs ) {                for ( attr in attrs ) {                    if (attrs.hasOwnProperty( attr )) {                        // Add each attribute to the tag                        tag[ attr ] = attrs[ attr ];                        if ( !( attr in tag.attributes ) ) {                            // If the attribute wasnt't successfully added,                            // try again with setAttribute                            tag.setAttribute( attr, attrs[ attr ] );                        }                    }                }            }            // Finally return the new tag            return tag;        }    });});
define('main', [
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
);  var library = require('main');
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = library;
  } else if (globalDefine) {
    (function (define) {
      define(function () { return library; });
    }(globalDefine));
  } else {
    global['Truss'] = library;
  }
}(this));
