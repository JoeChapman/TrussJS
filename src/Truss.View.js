
( function ( global ) {

	var Truss;

	if ( "undefined" != typeof module && module.exports ) {
		// NodeJS
		Truss = modules.exports.Truss;
	} else if ( "function" == typeof require && require.amd ) {
		// AMD
		Truss = require ( 'src/Truss' ).Truss;
	} else {
		// Browser
		Truss = global.Truss;
	}

	// Utility function
	function realTypeOf ( o ) {
		// Use toString to cast 'o' to its class definition,
		// e.g. [ object Object ] and return the 2nd part
		return Object.prototype.toString.call( o ).match( /\w+/g )[ 1 ].toLowerCase();
	}

	// Build the constructor
	Truss.View = Truss.construct({

		// Start is optional, it's called if present,
		// like a constructor
		start: function () {
			this.tagName = this.options.tagName || "div";
			this.rootNode = this.options.rootNode || window.document.body;
		},

		make: function () {
			var args = [].slice.call(arguments),
				name = args[0] || this.tagName,
				contents = args[1],
				attrs = args[2],
				tag = document.createElement(name);

			if (args.length === 2 && realTypeOf(contents) == "object") {
				contents = undefined;
				attrs = args[1];
			}

			// Add the contents
			if (typeof contents != "undefined") {
				if (realTypeOf(contents) == "number" || typeof contents == "string") {
					contents = document.createTextNode(contents);
				}
				if (realTypeOf(contents) == "array") {
					var i = 0;
					while (i < contents.length) {
						tag.appendChild(contents[i++]);
					}
				} else {
					tag.appendChild(contents)
				}
			}

			// Add the attributes
			if ( attrs ) {

				for (var a in attrs) {

					if (attrs.hasOwnProperty(a)) {

						tag[a] = attrs[a];
						
						if ( !( a in tag.attributes ) ) {
							
							tag.setAttribute( a, attrs[a] );

						}

					}

				}

				return tag;

			}

			return tag;

		}

	});

  if (typeof module != 'undefined' && module.exports) {
	// NodeJS
      module.exports.View = Truss.View;
  } else if (typeof define == "function" && define.amd) {
  // AMD
      define('Truss.View', [], function () { return Truss.View; });
  } else {
  // Browser
      global.Truss.View = Truss.View;
  }

}( this ));

	