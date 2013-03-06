require ( ['events'] , function ( events ) {

	describe("events", function () {

		describe("Given on is invoked with NO arguments", function () {

			it("Should throw 'on() needs an event name string'", function () {

				expect(function () {

					events.on();

				}).toThrow("on() needs an event name string");

			});

		});

		describe("Given on is invoked with ONLY an 'eventName'", function () {

			it("Should throw 'on() needs a callback function'", function () {
				expect(function () {
					
					events.on("eventName");

				}).toThrow("on() needs a callback function");
			});

		});

		describe("Given on is invoked with 'eventName' and a function", function () {

			var spyFunction;

			beforeEach(function () {
				spyFunction = jasmine.createSpy("function");
				events.on("eventName", spyFunction);
			});

			afterEach(function () {
				events.reset();
			});

			describe("When fire is invoked with 'eventName", function () {

				beforeEach(function () {
					events.fire("eventName");
				});

				it("Should call the function", function () {
					expect(spyFunction).toHaveBeenCalled();
				});

			});

			describe("When fire is invoked with 'eventName' and 'hello'", function () {

				beforeEach(function () {
					events.fire("eventName", "hello");
				});

				it("Should call the function with 'hello'", function () {
					expect(spyFunction).toHaveBeenCalledWith("hello");
				});

			});

			describe("And off is invoked with 'eventName", function () {

				beforeEach(function () {
					events.off("eventName");
				});

				describe("When fire is invoked with 'eventName'", function () {

					beforeEach(function () {
						events.fire("eventName");
					});

					it("Should NOT call the function", function () {
						expect(spyFunction).not.toHaveBeenCalled();
					});

				});

			});

			describe("And reset is invoked", function () {

				beforeEach(function () {
					events.reset();
				});

				describe("When fire is invoked with 'eventName'", function () {

					beforeEach(function () {
						events.fire("eventName");
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
				events.on("eventName", callback, context);
			});

			afterEach(function () {
				events.reset();
			});

			describe("When fire is invoked with 'eventName", function () {

				beforeEach(function () {
					events.fire("eventName");
				});

				it("Should invoke the function as a method of the context", function () {
					expect(proxy).toEqual("new");
				});

			});

			describe("When fire is invoked with 'eventName' and data and a context", function () {

				var data = {}, 
					context = { name: "radical" };

				beforeEach(function () {
					events.fire("eventName", data, context);
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
				events.on("eventName", spyFunction1);
				events.on("eventName", spyFunction2);
			});

			afterEach(function () {
				events.reset();
			});

			describe("When fire is invoked with 'eventName", function () {

				beforeEach(function () {
					events.fire("eventName");
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
					events.off();
				}).toThrow("off() needs an event");

			});

		});

		describe("Given an 'eventName' and 2 callbacks have been registered", function () {

			var spyFunction1, spyFunction2;

			beforeEach(function () {

				spyFunction1 = jasmine.createSpy("spyFunction1");
				spyFunction2 = jasmine.createSpy("spyFunction2");
				events.on("eventName", spyFunction1);
				events.on("eventName", spyFunction2);

			});

			afterEach(function () {
				events.reset();				
			});

			describe("And off is invoked with ONLY 'eventName'", function () {

				beforeEach(function () {
					events.off("eventName");
					events.off("eventName");
				});

				describe("When fire is invoked with 'eventName'", function () {

					it("Should NOT invoke the first callback", function () {

						waitsFor(function () {
							return events.events["eventName"].length === 0;
						}, 1000);

						runs(function () {
							events.fire("eventName");
							expect(spyFunction1).not.toHaveBeenCalled();
						});

					});

					it("Should NOT invoke the second callback", function () {

						waitsFor(function () {
							return events.events["eventName"].length === 0;
						}, 1000);

						runs(function () {
							events.fire("eventName");
							expect(spyFunction2).not.toHaveBeenCalled();
						});
					});

				});

			});

			describe("And off is invoked with 'eventName' and the second callback", function () {

				beforeEach(function () {
					events.off("eventName", spyFunction2);
				});

				describe("When fire is invoked with 'eventName'", function () {

					it("Should invoke the first callback", function () {

						events.fire("eventName");
						expect(spyFunction1).toHaveBeenCalled();

					});

					it("Should NOT invoke the second callback", function () {

						events.fire("eventName");
						expect(spyFunction2).not.toHaveBeenCalled();

					});

				});

			});

		});

		describe("When fire is invoked without an event", function () {

			it("Should throw 'fire() needs and event", function () {

				expect(function () {

					events.fire();

				}).toThrow("fire() needs an event");

			});

		});

	});

});
