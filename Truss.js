
(function (global) {

    // Private helpers
	function isObject (o) {
		return Object.prototype.toString.call(o) === "[object Object]";
	}

	function isDefined (o) {
		return typeof o !== "undefined";
	}

	function hasOwn(o, p) {
		return o.hasOwnProperty(p);
	}

	function realTypeOf (o) {
		return Object.prototype.toString.call(o).match(/\w+/g)[1].toLowerCase();
	}


	// Truss is a constructor
	function Truss (options) {

		// Add any arguments to this.options
		if (typeof options != "undefined") {
			this.options = options;
		}
		
		// Call the start function to do any setup
		if ( typeof this.start === "function") {
			this.start( options );
		}
	};

	Truss.prototype = {

		events: {},

		on: function (event, callback, context) {
			
			if ( typeof callback != "function" ) {

				throw new Error("on() needs a callback function");

			}

			if ( !this.events[event] ) {
				this.events[event] = [];
			}

			this.events[event].push({ 
				callback: callback, 
				context: context 
			});

		},

		reset: function () {
			this.events = {};
		},

		off: function (event, callback) {

			if (typeof event != "string") {
				throw new Error("off() needs an event");
			}

			if ( this.events[event] ) {

				var ev = this.events[event], len = ev.length;

				while (len--) {

					if (typeof callback !== 'function') {
						// If no callback was given, remove the event
						// and all its callbacks
						ev.splice(len, 1);

					} else {
						// If a callback was passed, 
						// remove the callback from the event
						if ( ev[len].callback === callback ) {
							
							ev[len].callback = null;
							
							delete ev[len].callback;
						}

					}

				} 

			}

		},
		
		fire: function (event, data, context) {
			
			if (!event) {
				throw new Error("fire() needs an event");
			}

			if ( this.events[event] ) {

				var ev, events = this.events[event], len = events.length;

				while ( len-- ) {

					ev = events[len];

					if ("function" == typeof ev.callback) {
						// Invoke the callback in either context provided with data
						ev.callback.call( ( context || ev.context || this ), data );

					}

				}

			}

		}

	};

	// Construct is the static inheritance function
	Truss.construct = function (proto) {
	
	    var i, parent = this, other = {};
	    
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

	
	// Export Truss for Node or browser
	if (typeof module != 'undefined' && module.exports) {
        module.exports = Truss;
    } else {
        global.Truss = Truss;
    }

})(this);

	

