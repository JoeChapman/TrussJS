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