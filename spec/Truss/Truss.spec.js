
describe("Truss", function () {

	describe("Before Truss is created", function () {
		it("Should have an extend function", function () {
			expect(typeof Truss.extend).toEqual("function");
		});
	});

	describe("Truss.extend", function () {

		var destination = {
				name: 'defaultProp', 
				hello: 'world', 
				styles: {
					width: '100px',
					height: '200px'
				}
			};

		describe("When the source is an object", function () {

			describe("When there is ONE source object", function () {

				var source = {
						name: 'sourceProp', 
						color: 'white', 
						styles: {
							width: '400px'
						}
					};

				describe("When the destination is extended with the source", function () {

					beforeEach(function () {
						Truss.extend(destination, source);
					});

					it("Should not affect destination properties that don't match source properties", function () {
						expect(destination.hello).toEqual("world");
					});
					it("Should add source properties to the destination", function () {
						expect(destination.color).toEqual("white");
					});
					it("Should override destination properties with matching source properties", function () {
						expect(destination.name).toEqual("sourceProp");
					});
					it("Should override nested destination properties with matching nested source properties", function () {
						expect(destination.styles.width).toEqual("400px");
					});
					it("Should not affect nested destination properties that don't match nested source properties", function () {
						expect(destination.styles.height).toEqual("200px");
					});
				});
			});

			describe("When there are TWO source objects", function () {
				var source = {
						name: 'sourceProp', 
						color: 'white', 
						styles: {
							width: '400px'
						}
					},
					source2 = {
						id: "second",
						name: "secondSourceProp"
					};

				describe("When the destination is extended with both source objects", function () {

					beforeEach(function () {
						Truss.extend(destination, source, source2);
					});

					it("Should add the source 2 properties to the destination", function () {
						expect(destination.id).toEqual("second");
					});
					it("Should override source 1 properties", function () {
						expect(destination.name).toEqual("secondSourceProp");
					});
				});
			});

			describe("When there are THREE source objects", function () {
				var source = {
						name: 'sourceProp', 
						color: 'white', 
						styles: {
							width: '400px'
						}
					},
					source2 = {
						id: "second",
						name: "secondSourceProp"
					};
					source3 = {
						id: "third",
						name: "thirdSourceProp"
					};

				describe("When the destination is extended with all source objects", function () {

					beforeEach(function () {
						Truss.extend(destination, source, source2, source3);
					});
					it("Should add the source 3 properties to the destination", function () {
						expect(destination.id).toEqual("third");
					});
					it("Should override source 1 and source 2 properties", function () {
						expect(destination.name).toEqual("thirdSourceProp");
					});
				});
			});

		});
		
		describe("When the source is a function constructor", function () {
			describe("When there is ONE source object", function () {

				var source = function () {
						this.name = "source", 
						this.type = "function"
					};

					source.prototype.fn = function () {};

				describe("When the destination is extended with the source", function () {

					beforeEach(function () {
						Truss.extend(destination, source);
					});

					it("Should add the constructors' own properties to the destination", function () {
						expect(destination.name).toEqual("source");
						expect(destination.type).toEqual("function");
					});
					it("Should add the prototype properties to the destination", function () {
						expect(typeof destination.fn).toEqual("function");
					});
				});
			});
		});

		describe("When there is NO source", function () {

			describe("When the destination is extended", function () {

				var applySource = {
					name: "no source"
				};

				beforeEach(function () {
					Truss.extend.call(applySource, destination);
				});

				it("Should add the properties of the object extend is invoked on to the destination", function () {
					expect(destination.name).toEqual("no source");
				});

			});
		});
	});

	describe("When Truss is created", function () {
		it("Should have an on method", function () {
			expect(typeof Truss.on).toEqual("function");
		});
		it("Should have an off method", function () {
			expect(typeof Truss.off).toEqual("function");
		});
		it("Should have an fire method", function () {
			expect(typeof Truss.fire).toEqual("function");
		});
	});
});


describe("Truss.Model", function () {
	var model = null;

	describe("When 3 new models are created without attributes", function () {
		var attributes = {
			name: "note",
			time: +Date.now()
		},
		models = [],
		count = 3;
		beforeEach(function () {
			while (0 < count--) {
				model = new Truss.Model(attributes);
				models.push(model);
			}
			count = models.length;
		});
		afterEach(function () {
			var count = models.length;
			while (0 < count--) {
				models[count].resetId();
			}
			models = [];
		});
		it("Should give each model an id incremented by 1 starting at 'mid_1'", function () {
			while (count--) {
				countId = count + 1;
				expect(models[count].id).toEqual("mid_" + countId);
			}
		});
	});
	describe("When 3 models are created with attributes", function () {
		var attributes = {
			name: "note",
			time: +Date.now()
		},
		models = [],
		count = 3;
		beforeEach(function () {
			while (0 < count--) {
				model = new Truss.Model(attributes);
				models.push(model);
			}
			count = models.length;
		});
		afterEach(function () {
			models = [];
		});
		it("Should give each model an id incremented by 1 starting at 'mid_1'", function () {
			while (count--) {
				countId = count + 1;
				expect(models[count].id).toEqual("mid_" + countId);
			}
		});
		it("Should have a property equal to each of the attributes passed in", function () {
			for (attr in attributes) {
				expect(model.get(attr)).toEqual(attributes[attr]);
			}
		});
	});
});

describe("Truss.Collection", function () {
	var collection = null;

	describe("When a collection is created without options", function () {
		it("Should not throw an error", function () {
			expect(function () {
				collection = new Truss.Collection();
			}).not.toThrow();
		});
	});
	describe("When a collection is created without a model", function () {
		beforeEach(function () {
			collection = new Truss.Collection();
		});
		afterEach(function () {
			collection.currentModel.resetId();
			collection = null;
		});
		describe("When a collection recieves 1 new object", function () {
			var spyFire,
				obj = {text: "I like Mangoes"};

			beforeEach(function () {
				spyFire = spyOn(collection, "fire");
				collection.add(obj);
			});
			it("Should fire an 'add' event with the new model", function () {
				expect(spyFire).toHaveBeenCalledWith("add", collection.getById("mid_4"));
			});
		});
	});
	describe("When a collection is created with a model", function () {
		beforeEach(function () {
			collection = new Truss.Collection({
				model: Truss.Model
			});
		});
		afterEach(function () {
			collection.currentModel.resetId();
			collection = null;
		});
		describe("When a collection recieves 1 new object", function () {
			var spyFire,
				obj = {text: "I like Mangoes"};

			beforeEach(function () {
				spyFire = spyOn(collection, "fire");
				collection.add(obj);
			});
			it("Should fire an 'add' event with the new model", function () {
				expect(spyFire).toHaveBeenCalledWith("add", collection.getById("mid_1"));
			});
		});
		describe("When a collection recieves two new objects", function () {
			var spyFire,
				obj1 = {text: "I like Mangoes"},
				obj2 = {text: "I like Bananas"};

			beforeEach(function () {
				spyFire = spyOn(collection, "fire");
				collection.add([obj1, obj2]);
			});
			it("Should fire the 'add' event twice", function () {
				expect(spyFire.callCount).toEqual(2);
			});
			it("Should fire an 'add' event with a new model for obj1", function () {
				expect(spyFire).toHaveBeenCalledWith("add", collection.getById("mid_1"));
			});
			it("Should fire an 'add' event with a new model for obj2", function () {
				expect(spyFire).toHaveBeenCalledWith("add", collection.getById("mid_2"));
			});
		});
		describe("When the collection has 2  models", function () {
			var obj1 = {text: "I like Mangoes"},
				obj2 = {text: "I like Bananas"},
				spyFire;

			beforeEach(function () {
				spyFire = spyOn(collection, "fire");
				collection.add([obj1, obj2]);
				
			});
			describe("When a removedById is called with by the id of the first model", function () {
				beforeEach(function () {
					collection.removeById("mid_1");
				});
				it("Should remove the model with the id 'mid_1' from the collection", function () {
					expect(typeof collection.getById("mid_1")).toBe("undefined");
				});
				it("Should NOT remove the model with the id 'mid_2' from the collection", function () {
					expect(typeof collection.getById("mid_2")).toBe("object");
				});
				it("Should still have 1 model", function () {
					expect(collection.getModels().length).toEqual(1);
				});
				it("Should fire 1 'removed' event with a list of the remaining models", function () {
					expect(spyFire.mostRecentCall.args).toEqual(["removed", [collection.getById("mid_2")]]);
				});
			});
		});
		describe("When the collection has 3 models", function () {
			describe("When 2 of the models have the same text", function () {
				var obj1 = {text: "I like Mangoes"},
					obj2 = {text: "I like Bananas"},
					obj3 = {text: "I like Bananas"},
					spyFire;

				beforeEach(function () {
					spyFire = spyOn(collection, "fire");
					collection.add([obj1, obj2, obj3]);
				});
				describe("When removeByText is called with 'I like Bananas'", function () {
					beforeEach(function () {
						collection.removeByText("I like Bananas");
					});
					it("Should remove the models with the text 'I like Bananas' from the collection", function () {
						expect(typeof collection.getByText("I like Bananas")).toEqual("undefined");
					});
					it("Should NOT remove the model with the text 'I like Mangoes' from the collection", function () {
						expect(typeof collection.getByText("I like Mangoes")).toEqual("object");
					});
					it("Should still have 1 model", function () {
						expect(collection.getModels().length).toEqual(1);
					});
					it("Should fire a 'removed' event with the remaining models", function () {
						expect(spyFire.mostRecentCall.args).toEqual(["removed", collection.getModels()]);
					});
				});
			});
		});
		describe("When the collection has 6 models", function () {
			var note1 = {text: "I like Mangoes"},
				note2 = {text: "I like Bananas"},
				note3 = {text: "I like Apples"},
				note4 = {text: "I like Mangoes"},
				note5 = {text: "I like Houmous"},
				note6 = {text: "I like Olives"},
				spyFire;

			beforeEach(function () {
				spyFire = spyOn(collection, "fire");
				collection.add([note1, note2, note3, note4, note5, note6]);
			});
			describe("When the collection is reset", function () {
				beforeEach(function () {
					collection.reset();
				});
				it("Should remove all the models", function () {
					expect(collection.getModels().length).toEqual(0);
				});
				it("Should fire a reset event", function () {
					expect(spyFire).toHaveBeenCalledWith("reset");
				});
			});
		});
	});
	
});

describe("Truss.View", function () {
	var view = null;

	describe("When a view is created without options", function () {
		it("Should not throw an error", function () {
			expect(function () {
				view = new Truss.View();
			}).not.toThrow();
		});
	});
	describe("When a view is created without options", function () {
		beforeEach(function () {
			view = new Truss.View();
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
				expect(html.nodeName.toLowerCase()).toEqual("div")
			});
		});
		describe("When make is called with the tag name argument 'p'", function () {
			var html,
				name = "p";
			beforeEach(function () {
				html = view.make(name);
			});
			it("Should make a p element", function () {
				expect(html.nodeName.toLowerCase()).toEqual(name)
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
					expect(html.nodeName.toLowerCase()).toEqual(name)
				});
				it("Should make a p element with a nested span element", function () {
					expect(html.firstChild.nodeName.toLowerCase()).toEqual("span")
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
								class: "element attr"
							};
						beforeEach(function () {
							html = view.make(name, document.createElement(contents), attrs);
						});
						it("Should make a p element", function () {
							expect(html.nodeName.toLowerCase()).toEqual(name)
						});
						it("Should make a p element with a nested span element", function () {
							expect(html.firstChild.nodeName.toLowerCase()).toEqual("span")
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
								class: "element attr",
							};
						beforeEach(function () {
							html = view.make(name, view.make(), attrs);
						});
						it("Should make a p element", function () {
							
							expect(html.nodeName.toLowerCase()).toEqual(name)
						});
						it("Should make a p element with a nested div element", function () {
							expect(html.firstChild.nodeName.toLowerCase()).toEqual("div")
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
								class: "element attr",
							};
						beforeEach(function () {
							html = view.make(name, contents, attrs);
						});
						it("Should make a p element", function () {
							expect(html.nodeName.toLowerCase()).toEqual(name)
						});
						it("Should make a p element with the text 'Hello World'", function () {
							expect(html.innerText).toEqual("Hello World")
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
								class: "element attr",
							};
						beforeEach(function () {
							html = view.make(name, contents, attrs);
						});
						it("Should make a p element", function () {
							expect(html.nodeName.toLowerCase()).toEqual(name)
						});
						it("Should make a p element with the text '137'", function () {
							expect(html.innerText).toEqual("137")
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
								class: "element attr",
							};
						beforeEach(function () {
							html = view.make(name, contents, attrs);
						});
						it("Should make a p element", function () {
							expect(html.nodeName.toLowerCase()).toEqual(name)
						});
						it("Should make a p element with the text '0'", function () {
							expect(html.innerText).toEqual("0")
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
								class: "element attr",
							};
						beforeEach(function () {
							html = view.make(name, [view.make("em"), view.make("span")], attrs);
						});
						it("Should make a p element", function () {
							expect(html.nodeName.toLowerCase()).toEqual(name)
						});
						it("Should make a p element with a first child em element", function () {
							expect(html.firstChild.nodeName.toLowerCase()).toEqual("em")
						});
						it("Should make a p element with a second child span element", function () {
							expect(html.children[1].nodeName.toLowerCase()).toEqual("span")
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
							class: "element attr",
						};
					beforeEach(function () {
						html = view.make(name, attrs);
					});
					it("Should make a p element", function () {
						expect(html.nodeName.toLowerCase()).toEqual(name)
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
	});
});