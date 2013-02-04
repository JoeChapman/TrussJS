( function ( global ) {

	var Truss;

	if ( "undefined" != typeof module && module.exports ) {
		// NodeJS
		Truss = modules.exports.Truss;
	} else if ( "function" == typeof require && require.amd ) {
		// AMD
		Truss = require ( 'src/Truss' ).Truss;
	} else {
		// Browser
		Truss = global.Truss;
	}

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

	

  exports.Model = Truss.Model;

} );
