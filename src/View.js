
define ( function ( require, exports, module ) {

	var Base = require ( 'Base' );

	// Utility function
	function realTypeOf ( o ) {
		// Use toString to cast 'o' to its class definition,
		// e.g. [ object Object ] and return the 2nd part, i.e. "Object"
		return Object.prototype.toString.call( o ).match( /\w+/g )[ 1 ].toLowerCase();
	}

	function getRootNode () {
		return document.getElementsByTagName("body")[0];
	}

	function getTagName () {
		return "div";
	}

	// Build the constructor
	var View = Base.construct({

		// Start is optional, it's called if present,
		// like a constructor
		start: function () {

			// Option properties override view properties
			this.tagName = this.options ? this.options.tagName : getTagName();
			this.rootNode = this.options ? this.options.rootNode : getRootNode();
		},

		/**
		 * Make a dom node
		 */
		make: function () {
			// All arguments are optional
			var args = [].slice.call(arguments),
				name = args[0] || this.tagName,
				contents = args[1],
				attrs = args[2],
				i,
				attr,
				tag = document.createElement(name);

			if (args.length === 2 && realTypeOf(contents) == "object") {
				contents = undefined;
				attrs = args[1];
			}

			// Add the contents
			if (typeof contents != "undefined") {

				if (realTypeOf(contents) == "number" || typeof contents == "string") {
					// If the contents is a Number or a String,
					// parse it to a textnode
					contents = document.createTextNode(contents);
				}

				if (realTypeOf(contents) == "array") {
					// If our contents is an array,
					// append each one to the tag
					while ( i = contents.shift() ) {
						tag.appendChild(i);
					}

				} else {

					tag.appendChild(contents);
				}
			}

			// Add the attributes
			if ( attrs ) {

				for ( attr in attrs ) {

					if (attrs.hasOwnProperty( attr )) {
						// Add each attribute to the tag
						tag[ attr ] = attrs[ attr ];

						if ( !( attr in tag.attributes ) ) {
							// If the attribute wasnt't successfully added,
							// try again with setAttribute
							tag.setAttribute( attr, attrs[ attr ] );

						}

					}

				}

			}
			// Finally return the new tag
			return tag;

		}

	});

  return View;

});