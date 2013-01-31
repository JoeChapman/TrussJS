
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


    Truss.Model = Truss.construct({

    	start: function () {
    		this.id = getNewId();
			this.resetId = resetId;
		},

		get: function (name) {
			return this[name] || this.options[name];
		}	

	});

	if (typeof module != 'undefined' && module.exports) {
        module.exports = Truss.Model;
    } else {
        global.Truss.Model = Truss.Model;
    }


}(this));

	

