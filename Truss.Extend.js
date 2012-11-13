
(function (global) {

	global.Truss = global.Truss || {};

	Truss.extend = function (destination, source) {

		// Private functions
		function isObject (o) {
			return Object.prototype.toString.call(o) === "[object Object]";
		}

		function isDefined (o) {
			return typeof o !== "undefined";
		}

		function hasOwn(o, p) {
			return o.hasOwnProperty(p);
		}

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

}(this));

	

