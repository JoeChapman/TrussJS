define( ['events', 'utils'], function ( events, utils ) {

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
  Base.mixin = function ( dest, src ) {

    var prop, sources = [].slice.call(arguments, 1);

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

  // Augment the Base prototype with the
  // properties of events;
  Base.mixin(Base.prototype, events, utils);


  // Return Base as the module definition
  return Base;

});