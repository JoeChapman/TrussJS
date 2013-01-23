
(function (global) {

	var 

	Truss = {},

	events = Truss.events = {
		
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

	// Redefine hasOwnProperty locally because we use it a lot.
	function hasOwn(o, p) {
		return o.hasOwnProperty(p);
	}

		
	Truss = {

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
				// If truss is a function, it should be a constructor, so new it up
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

	// Extend Truss with the events 
	Truss.extend(Truss, events);

	// Model
	Truss.Model = function (attributes) {
		this.id = getNewId();
		this.attributes = attributes;
		this.resetId = resetId;
	};

	var constants = {
			ID: 1,
			ORIGID: 1,
			IDPREFIX: "mid_"
		};
	
	function getNewId () {
		return constants.IDPREFIX + constants.ID++;
	}

	function resetId () {
		constants.ID = constants.ORIGID;
	}

    Truss.Model.prototype = Truss.extend({

		get: function (name) {
			return this[name] || this.attributes[name];
		}	

	});

	
    // Collection
	Truss.Collection = function (options) {
		this.options = options || {};
		this.models = [];
		this.model = this.options.model || Truss.Model;
	};

	function getCount () {
		return this.getModels().length;
	}

	function getBy (method, value) {
		var models = this.getModels(),
			len = models.length,
			found = [],
			i = 0;

		while (0 < len--) {
			if (typeof models[len][method] !== "undefined") {
				if (models[len][method] === value) {
					found.push(models[len]);
				}
			} else {
				if (models[len].get(method) === value) {
					found.push(models[len]);
				}
			}
		}
		return found = (found.length < 2) ? found[0] : found;
	}

	function removeBy (method, value) {
		var found = [].concat(getBy.call(this, method, value)),
			num = found.length,
			models = this.getModels(),
			len = models.length,
			index = -1;

		while (0 < len--) {
			while (0 < num--) {
				index = models.indexOf(found[num]);
				if (index !== -1) {
					models.splice(index, 1);
					this.fire("removed", this.getModels());
				}
			}	
		}
	};

	Truss.Collection.prototype = Truss.extend({

		add: function (data) {
			var attrs = [].concat(data),
				len = attrs.length;

			while (len--) {
				this.currentModel = new this.model(attrs[len]);
				this.getModels().push(this.currentModel);
				this.fire("add", this.currentModel);
			}
		},

		reset: function () {
			this.models = [];
			this.fire("reset");
		},

		getById: function (id) {
			return getBy.call(this, "id", id);
		},

		getByText: function (text) {
			return getBy.call(this, "text", text);
		},
		removeByText: function (text) {
			removeBy.call(this, "text", text);
		},

		removeById: function (id) {
			removeBy.call(this, "id", id);
		},

		getModels: function () {
			return this.models;
		}

	});

	// Private functions
	function realTypeOf (o) {
		return Object.prototype.toString.call(o).match(/\w+/g)[1].toLowerCase();
	}

	// Constructor
	Truss.View = function () {
		this.tagName = "div";
		this.rootNode = document.createElement("div");
	};

	Truss.View.prototype = Truss.extend({

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
			if (attrs) {
				for (var a in attrs) {
					if (attrs.hasOwnProperty(a)) {
						tag[a] = attrs[a];
						if (!(a in tag.attributes)) {
							tag.setAttribute(a, attrs[a]);
						}
					}
				}
				return tag;
			}
			return tag;
		}
	});

	// Export Truss for Node or browser
	if (typeof module != 'undefined' && module.exports) {
        module.exports = Truss;
    } else {
        global.Truss = Truss;
    }

})(this);

	

