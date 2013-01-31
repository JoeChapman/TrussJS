
(function (Notes) {
	var rootNode = document.getElementById("rootNode"),
	
		options = {
			rootNode: rootNode, 
			collection: new (Truss.Collection.construct())
		},

		form = new Notes.View.Form(options),
		count = new Notes.View.Count(options),
		list = new Notes.View.List(options);

}(Notes));
