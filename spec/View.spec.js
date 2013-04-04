require( ['View'], function ( View ) {

	describe("View", function () {
		var view = null;

		describe("When a view is created without options", function () {
			it("Should not throw an error", function () {
				expect(function () {
					view = View.create();
				}).not.toThrow();
			});
		});
		describe("When a view is created without options", function () {
			beforeEach(function () {
				view = View.create();
			});
			afterEach(function () {
				view = null;
			});
			describe("When make is called with no arguments", function () {
				var html;
				beforeEach(function () {
					html = view.make();
				});
				it("Should make a div element", function () {
					expect(html.nodeName.toLowerCase()).toEqual("div");
				});
			});
			describe("When make is called with the tag name argument 'p'", function () {
				var html,
					name = "p";
				beforeEach(function () {
					html = view.make(name);
				});
				it("Should make a p element", function () {
					expect(html.nodeName.toLowerCase()).toEqual(name);
				});
			});
			describe("When make is called with the tag name argument 'p'", function () {
				describe("When make is called with the contents argument 'span' element", function () {
					var html,
						name = "p";
					beforeEach(function () {
						html = view.make(name, document.createElement("span"));
					});
					it("Should make a p element", function () {
						expect(html.nodeName.toLowerCase()).toEqual(name);
					});
					it("Should make a p element with a nested span element", function () {
						expect(html.firstChild.nodeName.toLowerCase()).toEqual("span");
					});
				});

			});
			describe("When make is called with the tag name argument 'p'", function () {
				describe("When make is called with the contents argument 'span' element", function () {
					describe("When make is called with an id 'el1' attr", function () {
						describe("When make is called with a class 'element attr' attr", function () {
							var html,
								name = "p",
								contents = "span",
								attrs = {
									id: "el1",
									"class": "element attr"
								};
							beforeEach(function () {
								html = view.make(name, document.createElement(contents), attrs);
							});
							it("Should make a p element", function () {
								expect(html.nodeName.toLowerCase()).toEqual(name);
							});
							it("Should make a p element with a nested span element", function () {
								expect(html.firstChild.nodeName.toLowerCase()).toEqual("span");
							});
							it("Should add id='el1'to the p element", function () {
								expect(html.id).toEqual("el1");
							});
							it("Should add class='element attr'to the p element", function () {
								expect(html.className).toEqual("element attr");
							});
						});
					});
				});
				describe("When the contents argument is another make call with no arguments", function () {
					describe("When make is called with an id 'el1' attr", function () {
						describe("When make is called with a class 'element attr' attr", function () {
							var html,
								name = "p",
								attrs = {
									id: "el1",
									"class" : "element attr"
								};
							beforeEach(function () {
								html = view.make(name, view.make(), attrs);
							});
							it("Should make a p element", function () {
								expect(html.nodeName.toLowerCase()).toEqual(name);
							});
							it("Should make a p element with a nested div element", function () {
								expect(html.firstChild.nodeName.toLowerCase()).toEqual("div");
							});
							it("Should add id='el1'to the p element", function () {
								expect(html.id).toEqual("el1");
							});
							it("Should add class='element attr'to the p element", function () {
								expect(html.className).toEqual("element attr");
							});
						});
					});
				});
				describe("When the contents argument is the string 'Hello World'", function () {
					describe("When make is called with an id 'el1' attr", function () {
						describe("When make is called with a class 'element attr' attr", function () {
							var html,
								name = "p",
								contents = "Hello World",
								attrs = {
									id: "el1",
									"class": "element attr"
								};
							beforeEach(function () {
								html = view.make(name, contents, attrs);
							});
							it("Should make a p element", function () {
								expect(html.nodeName.toLowerCase()).toEqual(name);
							});
							it("Should make a p element with the text 'Hello World'", function () {
								expect(html.innerText).toEqual("Hello World");
							});
							it("Should add id='el1'to the p element", function () {
								expect(html.id).toEqual("el1");
							});
							it("Should add class='element attr'to the p element", function () {
								expect(html.className).toEqual("element attr");
							});
						});
					});
				});
				describe("When the contents argument is the number 137", function () {
					describe("When make is called with an id 'el1' attr", function () {
						describe("When make is called with a class 'element attr' attr", function () {
							var html,
								name = "p",
								contents = 137,
								attrs = {
									id: "el1",
									"class": "element attr"
								};
							beforeEach(function () {
								html = view.make(name, contents, attrs);
							});
							it("Should make a p element", function () {
								expect(html.nodeName.toLowerCase()).toEqual(name);
							});
							it("Should make a p element with the text '137'", function () {
								expect(html.innerText).toEqual("137");
							});
							it("Should add id='el1'to the p element", function () {
								expect(html.id).toEqual("el1");
							});
							it("Should add class='element attr'to the p element", function () {
								expect(html.className).toEqual("element attr");
							});
						});
					});
				});
				describe("When the contents argument is the number 0", function () {
					describe("When make is called with an id 'el1' attr", function () {
						describe("When make is called with a class 'element attr' attr", function () {
							var html,
								name = "p",
								contents = 0,
								attrs = {
									id: "el1",
									"class": "element attr"
								};
							beforeEach(function () {
								html = view.make(name, contents, attrs);
							});
							it("Should make a p element", function () {
								expect(html.nodeName.toLowerCase()).toEqual(name);
							});
							it("Should make a p element with the text '0'", function () {
								expect(html.innerText).toEqual("0");
							});
							it("Should add id='el1'to the p element", function () {
								expect(html.id).toEqual("el1");
							});
							it("Should add class='element attr'to the p element", function () {
								expect(html.className).toEqual("element attr");
							});
						});
					});
				});
				describe("When the contents argument is an array of make calls, [make('em'), make('span')]", function () {
					describe("When make is called with an id 'el1' attr", function () {
						describe("When make is called with a class 'element attr' attr", function () {
							var html,
								name = "p",
								attrs = {
									id: "el1",
									"class": "element attr"
								};
							beforeEach(function () {
								html = view.make(name, [view.make("em"), view.make("span")], attrs);
							});
							it("Should make a p element", function () {
								expect(html.nodeName.toLowerCase()).toEqual(name);
							});
							it("Should make a p element with a first child em element", function () {
								expect(html.firstChild.nodeName.toLowerCase()).toEqual("em");
							});
							it("Should make a p element with a second child span element", function () {
								expect(html.children[1].nodeName.toLowerCase()).toEqual("span");
							});
							it("Should add id='el1'to the p element", function () {
								expect(html.id).toEqual("el1");
							});
							it("Should add class='element attr'to the p element", function () {
								expect(html.className).toEqual("element attr");
							});
						});
					});
				});
			});
			describe("When the NO contents argument is supplied", function () {
				describe("When make is called with an id 'el1' attr", function () {
					describe("When make is called with a class 'element attr' attr", function () {
						var html,
							name = "p",
							attrs = {
								id: "el1",
								"class": "element attr"
							};
						beforeEach(function () {
							html = view.make(name, attrs);
						});
						it("Should make a p element", function () {
							expect(html.nodeName.toLowerCase()).toEqual(name);
						});
						it("Should add id='el1'to the p element", function () {
							expect(html.id).toEqual("el1");
						});
						it("Should add class='element attr'to the p element", function () {
							expect(html.className).toEqual("element attr");
						});
					});
				});
			});

			describe("When make is called with attrs, unknown: 'test'", function () {
				var html,
					name = "p",
					contents = "span",
					attrs = {
						unknown: "test"
					};
				beforeEach(function () {
					html = view.make(name, view.make(), attrs);
				});
				it("Should add unknown='test' element", function () {
					expect(html.unknown).toEqual("test");
				});
			});

			describe('calling setElement with an element', function () {
				var element;
				beforeEach(function () {
					element = view.make('div');
					view.setElement(element);
				});
				it('adds the element to the view object', function () {
					expect(view.element).toEqual(element);
				});
			});

			describe('Calling removeElement', function () {

				describe('with no arguments', function () {
					var parent,
						element;
					beforeEach(function () {
						parent = view.make('div');
						element = view.make('p');
						parent.appendChild(element);
						view.setElement(element);
						view.removeElement();
					});

					it('removes the element from the view', function () {
						expect(view.element).toEqual(null);
					});
					it('removes the element from the parent', function () {
						expect(parent.hasChildNodes()).toEqual(false);
					});
				});

				describe('with an element', function () {
					var parent,
						element;
					beforeEach(function () {
						parent = view.make('div');
						element = view.make('p');
						parent.appendChild(element);
						view.removeElement(element);
					});
					it('removes the element from the parent', function () {
						expect(parent.hasChildNodes()).toEqual(false);
					});
				});
			});

			describe('Calling replaceElement', function () {

				describe('with a replacement element', function () {
					var parent,
						element,
						replacement;
					beforeEach(function () {
						parent = view.make('div');
						element = view.make('p');
						parent.appendChild(element);
						replacement = view.make('span');
						view.setElement(element);
						view.replaceElement(replacement);
					});
					it('replaces the view element with the replacement', function () {
						expect(parent.firstChild).toEqual(replacement);
					});
					it('sets old element', function () {
						expect(view.oldElement.nodeName).toEqual('P');
					});
				});

				describe('with a replacement element and replacee', function () {
					var parent,
						replacee,
						replacement;
					beforeEach(function () {
						parent = view.make('div');
						replacee = view.make('p');
						parent.appendChild(replacee);
						replacement = view.make('span');
						view.replaceElement(replacement, replacee);
					});
					it('replaces the view element with the replacement', function () {
						expect(parent.firstChild).toEqual(replacement);
					});
					it('sets old element', function () {
						expect(view.oldElement.nodeName).toEqual('P');
					});
				});
			});
		});
	});
});
