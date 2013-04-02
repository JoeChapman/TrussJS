
var rootNode = document.getElementById("rootNode"),
	options = {
		rootNode: rootNode,
        tagName: 'div',
		collection: Truss.collection.create()
	};

todoForm.create(options);
todoCount.create(options);
todoList.create(options);
