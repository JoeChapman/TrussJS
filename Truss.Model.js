(function (global) {

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

	global.Truss = global.Truss || {};

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

}(this));

	

