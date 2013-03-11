
var rootNode = document.getElementById("rootNode"),
	options = {
		rootNode: rootNode,
		collection: Truss.Collection()
	};

var form = todoForm(options);
todoCount(options);
todoList(options);

console.log('form view', form)