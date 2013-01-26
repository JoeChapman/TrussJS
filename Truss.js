
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

	// Truss prototype is the events
	Truss.prototype = {

		events: {},

		on: function(event, fn, context) {
			if (typeof fn === 'undefined') {
				return;
			}
			if (!this.events[event]) {
				this.events[event] = [];
			}
			this.events[event].push({fn: fn, context: context});
		},

		off: function(event, fn) {
			if (!this.events[event]) {
				return;
			}
			var i, ev = this.events[event];
			for (i = 0, len = ev.length; i < len; i++) {
				if (typeof fn === 'function') {
					if (ev[i].fn === fn) {
						ev[i].fn = null;
						delete ev[i].fn;
					}
				} else {
				 	ev.splice(i, 1);
				}
			} 
		},
		
		fire: function(event, data, context) {
			if (!this.events[event]) {
				return;
			}
			var i, ev = this.events[event];
			for (i = 0, len = ev.length; i < len; i++) {
				try {
					if ('PAUSE' === ev[i].fn.call((context || ev[i].context || this), data)) {
						break;
					}
				} catch (e) {
					console.log(e);
					throw {
						name: "CallBackError",
						message: "Cannot call null callBack"
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

	

