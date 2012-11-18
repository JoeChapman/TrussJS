
(function (global) {

	// Exports Truss to global namespace
	global.Truss = global.Truss || {};

	// Define events 

	var events = {
		
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

	/**
     * Private helpers
    */
	function isObject (o) {
		return Object.prototype.toString.call(o) === "[object Object]";
	}

	function isDefined (o) {
		return typeof o !== "undefined";
	}

	function hasOwn(o, p) {
		return o.hasOwnProperty(p);
	}
	
	Truss = {

		// Define extend on Truss
		extend: function (destination, source) {

			var i, 
				j,
				num,
				source = typeof source == "undefined" ? this : source,
				sources = [].concat(source);

			if (arguments.length > 2) {
				sources = [].slice.call(arguments, 1);
			}

			num = sources.length;

			while (num--) {
				
				source = typeof sources[num] == "function" ? new sources[num] : sources[num];

				for (i in source) {
					if (isObject(source[i])) {
						if (i in destination) {
							for (j in destination[i]) {
								if (hasOwn(destination[i], j)) {
									if (isDefined(source[i][j])) {
										destination[i][j] = source[i][j];
									}
								}
							}
						} else {
							destination[i] = source[i];
						}
					} else {
						if (isDefined(source[i])) {
							destination[i] = source[i];
						}
					}
				}
				return destination;
			}
		}
	};

	// Extend Truss with the Events 
	Truss.extend(Truss, events);

}(this));

	

