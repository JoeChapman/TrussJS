
(function (Notes) {
	var rootNode = document.getElementById("rootNode"),
	
		collection = new Notes.Collection.Notes();

		options = {
			rootNode: rootNode, 
			collection: collection
		},

		form = new Notes.View.Form(options),
		count = new Notes.View.Count(options),
		list = new Notes.View.List(options);

}(Notes));
