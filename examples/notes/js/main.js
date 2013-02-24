require( [
	'Notes.View.Form',
	'Notes.View.List',
	'Notes.View.Count',
	'Notes.View.Note',
	'Notes.View.Edit_Note'
	], function () {

		var rootNode = document.getElementById("rootNode"),
	
		options = {
			rootNode: rootNode, 
			collection: new (Truss.Collection.construct())
		},

		form = new Notes.View.Form(options),
		count = new Notes.View.Count(options),
		list = new Notes.View.List(options);


});