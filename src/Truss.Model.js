define( function ( require, exports, module ) {

	var Truss = require ( 'src/Truss' ).Truss,

		constants = {
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

		get: function ( name ) {
			return this[ name ] || this.options[ name ];
		},

		set: function ( name, value ) {
			this[ name ] = value;
		} 

	});

  module.exports.Model = Truss.Model;

});
