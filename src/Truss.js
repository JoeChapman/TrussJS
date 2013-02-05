
(function ( global ) {

  function isObject (o) {
    return Object.prototype.toString.call(o) === "[object Object]";
  }

  function isDefined (o) {
    return "undefined" != typeof o;
  }

  function hasOwn(o, p) {
    return o.hasOwnProperty(p);
  }

  function realTypeOf (o) {
    return Object.prototype.toString.call(o).match(/\w+/g)[1].toLowerCase();
  }

  // Truss is a constructor
  function Truss (options) {

    this.events = {};

    // Add any arguments to this.options
    if ( "undefined" != typeof options ) {
      this.options = options;
    }

    // Call the start function to do any setup
    if ( "function" == typeof this.start ) {
      this.start( options );
    }

  }

  Truss.prototype = {

    on: function (event, callback, context) {

      var ctx;

      if ( "string" != typeof event ) {
        throw new Error("on() needs an event name string");
      }

      if ( "function" != typeof callback ) {
        throw new Error("on() needs a callback function");
      }

      ctx = [].slice.call( arguments, 2)[0];

      if ( !this.events[event] ) {
        this.events[event] = [];
      }

      this.events[event].push({ 
        callback: callback, 
        context: ctx 
      });

    },

    reset: function () {
      this.events = {};
    },

    off: function (event) {

      var ev, len, cb;

      // Event must be a string
      if ( "string" != typeof event ) {
        throw new Error( "off() needs an event" );
      }

      cb = [].slice.call( arguments, 1)[0];

      // If the event has been registered
      if ( this.events[event] ) {

        ev = this.events[event];
        len = ev.length;

        // Loop over each event object that matches ours.
        while ( len-- ) {

          if ( "function" != typeof cb ) {
            // If no callback was given, remove the event
            // and all its callbacks
            ev.splice(len, 1);

          } else {
            // If a callback was passed, 
            // remove the callback from the event
            if ( ev[len].callback === cb ) {

              ev[len].callback = null;

              delete ev[len].callback;
            
            }

          }

        } 

      }  

    },

    fire: function ( event ) {

      var ev, len, opt, data, ctx;

      // event argument is mandatory
      if ( "string" != typeof event ) {
        throw new Error("fire() needs an event");
      }

      // Optional arguments
      opt = [].slice.call( arguments, 1 );
      data = opt[0];
      ctx = opt[1];

      // If this event has been registered
      if ( this.events[ event ] ) {

        len = this.events[ event ].length; 

        // Invoke the callback on each event object
        while ( ev = this.events[event][--len] ) {

          if ("function" == typeof ev.callback) {

            // Invoke in either context with data if present
            ev.callback.call( ( ctx || ev.context || this ), data );

          }

        }

      }

    }

  };

  // Construct is the static inheritance function
  var construct = function (proto) {

    var j, 
      i, 
      parent = this, 
      other = {};

    // Add all proto properties to the parent prototype
    for (j in parent.prototype) {
      other[j] = parent.prototype[j];
    }

    for (i in proto) {
      other[i] = proto[i];
    }

    // Make the new constructor call the parent with its arguments
    function F () {
      return parent.call(this, [].slice.call(arguments)[0]);
    }

    // Add any static properties from the parent to the new constructor
    for (j in parent) {
      F[j] = parent[j];
    }

    // Make the constructor prototype
    F.prototype = other;
    F.prototype.constructor = F;

    // Blamo!!
    return F;
  };

  Truss.construct = construct;

  // -- Node Js --
  if (typeof module != 'undefined' && module.exports) {
      module.exports = Truss;
  // -- AMD --
  } else if (typeof define == "function" && define.amd) {
      define('Truss', [], function () { return Truss; });
  // -- Browser --
  } else {
      global.Truss = Truss;
  }

}( this ));
