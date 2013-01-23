
(function (global) {

	var Truss;

	if (typeof exports != 'undefined') {
        Truss = exports.Truss;
    } else {
        Truss = global.Truss || {};
    }

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

	Truss.Model = function (attributes) {
		this.id = getNewId();
		this.attributes = attributes;
		this.resetId = resetId;
	};

    Truss.Model.prototype = Truss.extend({

		get: function (name) {
			return this[name] || this.attributes[name];
		}	

	});

	/*if (typeof module != 'undefined' && module.exports) {
        module.exports.Truss.Model = Truss.Model;
    } else {
        global.Truss.Model = Truss.Model;
    }*/


}(this));

	

