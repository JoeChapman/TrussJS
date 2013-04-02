define( function ( ) {

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
    }

  };

});