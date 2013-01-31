require( ['src/Truss'], function ( TrussExport ) {

	var Truss = TrussExport.Truss;

	describe("Truss", function () {

		describe("When Truss has not been created", function () {

			it("Should have a static construct function", function () {
				expect(typeof Truss.construct).toEqual("function");
			});

		});

		describe("When Truss.construct is invoked with NO arguments", function () {

			var retVal;

			beforeEach(function () {
				retVal = Truss.construct();
			});

			it("Should return a function object", function () {
				expect(typeof retVal).toEqual("function");
			});

			it("Should return a function with a static contruct function", function () {
				expect(typeof retVal.construct).toEqual("function");
			})

		});

		describe("When Truss.construct is invoked with arguments", function () {

			describe("When the argument is an object with a method", function () {

				var retVal;

				beforeEach(function () {
					retVal = Truss.construct({fn: function () {}});
				});

				it("Should return a function with the method on its prototype", function () {

					expect(typeof retVal.prototype.fn).toEqual("function");

				});
			});

		});

		describe("When construct is invoked on the returned function with an argument", function () {

			var retVal1;

			beforeEach(function () {
				retVal1 = Truss.construct();
			});

			describe("When the argument is an object with a method", function () {

				var retVal2;

				beforeEach(function () {
					retVal2 = retVal1.construct({fn: function () {}});
				});

				it("Should return a function with the method on its prototype", function () {
					expect(typeof retVal2.prototype.fn).toEqual("function");
				});
			});

		});

		describe("When Truss is created", function () {

			var truss = null;

			beforeEach(function () {
				truss = new Truss();
			});

			afterEach(function () {
				truss = null;
			})

			it("Should have an on method", function () {
				expect(typeof truss.on).toEqual("function");
			});
			
			it("Should have an off method", function () {
				expect(typeof truss.off).toEqual("function");
			});

			it("Should have an fire method", function () {
				expect(typeof truss.fire).toEqual("function");
			});

			describe("Given on is invoked with ONLY an 'eventName'", function () {

				it("Should throw 'on() needs a callback function'", function () {
					expect(function () {
						
						truss.on("eventName");

					}).toThrow("on() needs a callback function");
				});

			});

			describe("Given on is invoked with 'eventName' and a function", function () {

				var spyFunction;

				beforeEach(function () {
					spyFunction = jasmine.createSpy("function");
					truss.on("eventName", spyFunction);
				});

				afterEach(function () {
					truss.reset();
				});

				describe("When fire is invoked with 'eventName", function () {

					beforeEach(function () {
						truss.fire("eventName");
					});

					it("Should call the function", function () {
						expect(spyFunction).toHaveBeenCalled();
					});

				});

				describe("When fire is invoked with 'eventName' and 'hello'", function () {

					beforeEach(function () {
						truss.fire("eventName", "hello");
					});

					it("Should call the function with 'hello'", function () {
						expect(spyFunction).toHaveBeenCalledWith("hello");
					});

				});

				describe("And off is invoked with 'eventName", function () {

					beforeEach(function () {
						truss.off("eventName");
					});

					describe("When fire is invoked with 'eventName'", function () {

						beforeEach(function () {
							truss.fire("eventName");
						});

						it("Should NOT call the function", function () {
							expect(spyFunction).not.toHaveBeenCalled();
						});

					});

				});

				describe("And reset is invoked", function () {

					beforeEach(function () {
						truss.reset();
					});

					describe("When fire is invoked with 'eventName'", function () {

						beforeEach(function () {
							truss.fire("eventName");
						});

						it("Should NOT call the function", function () {
							expect(spyFunction).not.toHaveBeenCalled();
						});

					});


				});

			});

			describe("Given on is invoked with 'eventName', a callback and a context", function () {

				var proxy,
					callback = function () {
						proxy = this.name;
					},
					context = {	name: "new"	};

				beforeEach(function () {
					truss.on("eventName", callback, context);
				});

				afterEach(function () {
					truss.reset();
				});

				describe("When fire is invoked with 'eventName", function () {

					beforeEach(function () {
						truss.fire("eventName");
					});

					it("Should invoke the function as a method of the context", function () {
						expect(proxy).toEqual("new");
					});

				});

				describe("When fire is invoked with 'eventName' and data and a context", function () {

					var data = {}, 
						context = { name: "radical" };

					beforeEach(function () {
						truss.fire("eventName", data, context);
					});

					it("Should invoke the function as a method of the context", function () {
						expect(proxy).toEqual("radical");
					});

				});

			});

			describe("Given on is invoked twice with 'eventName', a two callbacks", function () {

				var spyFunction1, spyFunction2;

				beforeEach(function () {
					spyFunction1 = jasmine.createSpy("spyFunction1");
					spyFunction2 = jasmine.createSpy("spyFunction2");
					truss.on("eventName", spyFunction1);
					truss.on("eventName", spyFunction2);
				});

				afterEach(function () {
					truss.reset();
				});

				describe("When fire is invoked with 'eventName", function () {

					beforeEach(function () {
						truss.fire("eventName");
					});

					it("Should invoke the first function", function () {
						expect(spyFunction1).toHaveBeenCalled();
					});

					it("Should invoke the second function", function () {
						expect(spyFunction2).toHaveBeenCalled();
					});
				});

			});

			describe("When off is invoked without an event", function () {

				it("Should throw 'off() needs an event", function () {

					expect(function () {
						truss.off();
					}).toThrow("off() needs an event");

				});

			});

			describe("Given an 'eventName' and 2 callbacks have been registered", function () {

				var spyFunction1, spyFunction2;

				beforeEach(function () {

					spyFunction1 = jasmine.createSpy("spyFunction1");
					spyFunction2 = jasmine.createSpy("spyFunction2");
					truss.on("eventName", spyFunction1);
					truss.on("eventName", spyFunction2);

				});

				afterEach(function () {
					truss.reset();				
				})

				describe("And off is invoked with ONLY 'eventName'", function () {

					beforeEach(function () {
						truss.off("eventName");
						truss.off("eventName");
					});

					describe("When fire is invoked with 'eventName'", function () {

						it("Should NOT invoke the first callback", function () {

							waitsFor(function () {
								return truss.events["eventName"].length == 0;
							}, 1000);

							runs(function () {
								truss.fire("eventName");
								expect(spyFunction1).not.toHaveBeenCalled();
							});

						});

						it("Should NOT invoke the second callback", function () {

							waitsFor(function () {
								return truss.events["eventName"].length == 0;
							}, 1000);

							runs(function () {
								truss.fire("eventName");
								expect(spyFunction2).not.toHaveBeenCalled();
							})
						});

					});

				});

				describe("And off is invoked with 'eventName' and the second callback", function () {

					beforeEach(function () {
						truss.off("eventName", spyFunction2);
					});

					describe("When fire is invoked with 'eventName'", function () {

						it("Should invoke the first callback", function () {

							truss.fire("eventName");
							expect(spyFunction1).toHaveBeenCalled();

						});

						it("Should NOT invoke the second callback", function () {

							truss.fire("eventName");
							expect(spyFunction2).not.toHaveBeenCalled();

						});

					});

				});

			});

			describe("When fire is invoked without an event", function () {

				it("Should throw 'fire() needs and event", function () {

					expect(function () {

						truss.fire()

					}).toThrow("fire() needs an event");

				});
			});

		});

	});

});
