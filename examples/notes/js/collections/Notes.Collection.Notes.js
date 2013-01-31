var Notes = Notes || {};
Notes.Collection =  Notes.Collection || {};

Notes.Collection.Notes = function (options) {
	Truss.extend(this, options);
};


Notes.Collection.Notes.prototype = Truss.extend({}, Truss.Collection);

