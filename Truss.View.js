
(function (global) {

	// Private functions
	function realTypeOf (o) {
		return Object.prototype.toString.call(o).match(/\w+/g)[1].toLowerCase();
	}

	// Build the constructor
	Truss.View = Truss.construct({

		start: function () {
			this.tagName = "div";
			this.rootNode = window.document.body;
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

	if (typeof module != 'undefined' && module.exports) {
        module.exports = Truss.View;
    } else {
        global.Truss.View = Truss.View;
    }

}(this));

	