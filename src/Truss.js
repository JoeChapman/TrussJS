define( function ( require, exports, module ) {

  var EventEmitter = require ( 'Truss.EventEmitter' ),

  /**
   * @constructor
   * @description
   * -> Core of Truss framework
   * @param {Object} options
   * @return {this}
   */
  Truss = function ( options ) {

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
  Truss.mixin = function( dest, source, deep ) {
    for (var property in source) {
      // Iterate over all source properties
      if ( deep && "object" == typeof source[property] ) {
        dest[property] = dest[property] || {};
        // If the value is an object itself, then we need to recurse
        // to to perform a deep copy; Objects copy by refernce
        Truss.mixin( dest[property], source[property] );
      } else {
        // Assign the value form the source to the destination
        dest[property] = source[property];
      }
    }
    return dest;
  },

  /**
   * @static
   * @description
   * -> Construct is a static inheritance function
   * @return {Function} constructor function
   */
  Truss.construct = function (props) {

    var parent = this;

    // The new constructor Function invokes the parent with arguments
    // passed on instantiation of this constructor
    function F () {
      return parent.call(this, [].slice.call(arguments)[0]);
    }

    // Build the prototype from parent.prototype and the props arg.
    F.prototype = Truss.mixin( Truss.mixin( {}, parent.prototype ), props );
    // Augment the constructor with the parent.
    F.prototype.constructor = Truss.mixin( F, parent );

    // Retun the constructor
    return F;
  };

  // Augment the Truss constructor prototype with the 
  // properties of EventEmitter;
  Truss.mixin(Truss.prototype, EventEmitter);

  // Export Truss Node AMD style
  return Truss;

});