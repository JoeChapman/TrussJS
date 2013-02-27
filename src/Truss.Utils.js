define( function ( require, exports, module ) {

  var Utils = {

    isObject: function ( o ) {
      // Concat Object with string to 
      // invoke toString() and test class definition
      return "[object Object]" === ''+o;
    },

    realTypeOf: function ( value ) { 
      // Borrow Object.toString to introspect the
      // class definition of the value i.e. ([object Object]) 
      // and return the latter portion which denotes 
      // the real type of the input value.
      return ({}).toString.call(value).match( /\w+/g )[1].toLowerCase();
    }

  };

  return Utils;

});