define( ['events'], function ( events ) {

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
    }

    // Call the start function to do any setup
    if ( "function" == typeof this.start ) {
      this.start( options );
    }

  };

  /**
   * @static
   * @description
   * -> Takes two objects and applies all proprties from one to the other.
   * @param {Object} dest
   * @param {Object} source
   * @return {Object} augmented dest
   */
  Base.mixin = function ( dest, source, deep ) {

    for (var property in source) {
      // Iterate over all source properties
      if ( deep && "object" == typeof source[property] ) {
        dest[property] = dest[property] || {};
        // If the value is an object itself, then we need to recurse
        // to to perform a deep copy; Objects copy by refernce
        Base.mixin( dest[property], source[property] );
      } else {
        // Assign the value form the source to the destination
        dest[property] = source[property];
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
  Base.construct = function (props) {

    var parent = this,
        proto = props || {};

    function F () {}
    F.prototype = parent.prototype;
    F.prototype.constructor = Base.mixin( F, parent );

    function create (options) {
        var proto = mix();
        Base.call(proto, options);
        return proto;
    }

    function mix() {
      return Base.mixin( new F(), proto );
    }

    function proxy () {}
    proxy.prototype = mix();
    proxy.construct = F.construct;
    proxy.create = create;

    return proxy;

  };

  // Augment the Base prototype with the
  // properties of events;
  Base.mixin(Base.prototype, events);

  // Return Base as the module definition
  return Base;

});