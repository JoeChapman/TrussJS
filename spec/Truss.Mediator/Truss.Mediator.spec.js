if (typeof require == "function") {
    Truss = require("../../Truss");
    Truss.Mediator = require("../../Truss.Mediator");
}


describe("Mediator", function () {

    describe("Given the events are registered in a functional, API style", function () {

        var mediator = null,
            data = { page: 1, totalResults: 1000 };

        afterEach(function () {
            mediator = null;
        });

        describe("Given a 'event:target' is registered on a target object to 'event:source' on a source object", function () {

            var source, target, mediator;

            beforeEach(function () {
                source = new (Truss.construct({
                    name: 'source'
                }));
                target = new (Truss.construct({
                    name: 'target'
                }));

                // Create a mediator instance.
                mediator = new (Truss.Mediator.construct());

                // The registration 'API-style'
                mediator.from( source , "event:source" ).to( target, "event:target" );
            });

            describe("When 'event:source' is fired on the source object", function () {

                var spyTargetFire;

                beforeEach(function () {
                    spyTargetFire = spyOn( target, "fire").andCallThrough();
                    source.fire("event:source", data );
                });

                it("Should fired 'event:target' event on the target object", function() {
                    expect(spyTargetFire).toHaveBeenCalledWith("event:target", data);
                });

            });

        });

        describe("Given a 'event:target' is registered on 2 target objects to 'event:source' on a source object", function () {

            var source, target1, target2, mediator;

            beforeEach(function () {
                source = new (Truss.construct({
                    name: 'source'
                }));
                target1 = new (Truss.construct({
                    name: 'target1'
                }));
                target2 = new (Truss.construct({
                    name: 'target2'
                }));

                // Create a mediator instance.
                mediator = new (Truss.Mediator.construct());

                // The registration 'API-style'
                mediator.from( source , "event:source" )
                    .to( target1, "event:target" )
                    .to( target2, "event:target" );
            });

            describe("When 'event:source' is fired on the source object", function () {

                var spyTarget1Fire, 
                    spyTarget2Fire;

                beforeEach(function () {

                    spyTarget1Fire = spyOn( target1, "fire").andCallThrough();
                    spyTarget2Fire = spyOn( target2, "fire").andCallThrough();

                    source.fire("event:source", data );

                });

                it("Should fire 'event:target' on the first target object", function() {
                    expect(spyTarget1Fire).toHaveBeenCalledWith("event:target", data);
                });

                it("Should fire 'event:target' on the second target object", function() {
                    expect(spyTarget2Fire).toHaveBeenCalledWith("event:target", data);
                });

            });

        });

    });

/*    describe("Given the events are registered in a functional, API style, with chaining", function () {

        var mediator = null,
            sourceObject0 = null,
            sourceObject1 = null,
            targetObject0 = null,
            targetObject1 = null;


        beforeEach(function () {

            // Alias mediator singleton
            mediator = Truss.Mediator;

            sourceObject0 = _.extend({
                name: 'sourceObject0'
            }, Backbone.Events);

            sourceObject1 = _.extend({
                name: 'sourceObject1'
            }, Backbone.Events);

            targetObject0 = _.extend({
                name: 'targetObject0'
            }, Backbone.Events);

            targetObject1 = _.extend({
                name: 'targetObject1'
            }, Backbone.Events);

        });

        afterEach(function () {

            mediator = null;
            sourceObject0 = null;
            sourceObject1 = null;
            targetObject0 = null;
            targetObject1 = null;

        });

        describe("Given two target objects are registered with the event 'mockTargetEvent' to the event 'mock:event' on a source object", function () {

            var data;

            beforeEach(function () {

                // The complicated bit
                mediator.from( sourceObject0 , "mock:event" ).to( targetObject0, "mockTargetEvent").to( targetObject1, "mockTargetEvent" );

                // Arbitrary event data
                data = { page: 1, totalResults: 1000 };

            });

            describe("When the event 'event:sourceObject' is triggered on the source object", function () {

                var spyTargetObject0Trigger,
                    spyTargetObject1Trigger;

                beforeEach(function () {

                    spyTargetObject0Trigger = spyOn( targetObject0, "trigger");
                    spyTargetObject1Trigger = spyOn( targetObject1, "trigger");

                    // The action happens here!!
                    sourceObject0.trigger( "mock:event", data );

                });

                it("Should trigger the event on targetObject0", function() {
                    expect(spyTargetObject0Trigger).toHaveBeenCalledWith("mockTargetEvent", data);
                });

                it("Should trigger the event on the targetObject0 only once", function () {
                    expect(spyTargetObject0Trigger.callCount).toEqual(1);
                });

                it("Should trigger the event on targetObject1", function() {
                    expect(spyTargetObject1Trigger).toHaveBeenCalledWith("mockTargetEvent", data);
                });

                it("Should trigger the event on the targetObject1 only once", function () {
                    expect(spyTargetObject1Trigger.callCount).toEqual(1);
                });

            });

            describe("When the target has its event 'mockTargetEvent' unregistered from the event 'mock:event' on the source", function () {

                var spyTargetObject0Trigger,
                    spyTargetObject1Trigger;

                beforeEach(function () {

                    spyTargetObject0Trigger = spyOn(targetObject0, "trigger");
                    spyTargetObject1Trigger = spyOn( targetObject1, "trigger");

                    // unregister target from source
                    mediator.remove( targetObject0, "mockTargetEvent" ).remove( targetObject1, "mockTargetEvent" ).from( sourceObject0, "mock:event" );

                });

                describe("When the event 'event:sourceObject' is triggered on the source object", function () {

                    beforeEach(function () {
                        // Trigger the source event
                        sourceObject0.trigger( "mock:event", data );
                    });

                    it("Should NOT trigger the 'event:targetObject' event", function () {
                        expect(spyTargetObject0Trigger).not.toHaveBeenCalled();
                    });

                    it("Should NOT trigger the 'event:targetObject' event", function () {
                        expect(spyTargetObject1Trigger).not.toHaveBeenCalled();
                    });

                });
            });

        });

    });

    describe("Given the events are registered in a configuration style", function () {

        var mediator = null,
            sourceObject0 = null,
            sourceObject1 = null,
            targetObject0 = null,
            targetObject1 = null;


        beforeEach(function () {

            // Alias mediator singleton
            mediator = Truss.Mediator;

            sourceObject0 = _.extend({
                name: 'sourceObject0'
            }, Backbone.Events);

            sourceObject1 = _.extend({
                name: 'sourceObject1'
            }, Backbone.Events);

            targetObject0 = _.extend({
                name: 'targetObject0'
            }, Backbone.Events);

            targetObject1 = _.extend({
                name: 'targetObject1'
            }, Backbone.Events);

        });

        afterEach(function () {

            mediator = null;
            sourceObject0 = null;
            sourceObject1 = null;
            targetObject0 = null;
            targetObject1 = null;

        });

        describe("Given two target objects are registered with the event 'mockTargetEvent' to the same event 'mock:event' on a source object", function () {

            var data;

            beforeEach(function () {

                // The complicated bit
                mediator.register({
                    source: [{
                        subscriber: sourceObject0,
                        event: 'mock:event'
                    }],
                    target: [{
                        subscriber: targetObject0,
                        event: 'mockTargetEvent'
                    }, {
                        subscriber: targetObject1,
                        event: 'mockTargetEvent'
                    }]
                });

                // Arbitrary event data
                data = { page: 1, totalResults: 1000 };

            });

            describe("When the event 'event:sourceObject' is triggered on the source object", function () {

                var spyTargetObject0Trigger,
                    spyTargetObject1Trigger;

                beforeEach(function () {

                    spyTargetObject0Trigger = spyOn( targetObject0, "trigger");
                    spyTargetObject1Trigger = spyOn( targetObject1, "trigger");

                    // The action happens here!!
                    sourceObject0.trigger( "mock:event", data );

                });

                it("Should trigger the event on targetObject0", function() {
                    expect(spyTargetObject0Trigger).toHaveBeenCalledWith("mockTargetEvent", data);
                });

                it("Should trigger the event on the targetObject0 only once", function () {
                    expect(spyTargetObject0Trigger.callCount).toEqual(1);
                });

                it("Should trigger the event on targetObject1", function() {
                    expect(spyTargetObject1Trigger).toHaveBeenCalledWith("mockTargetEvent", data);
                });

                it("Should trigger the event on the targetObject1 only once", function () {
                    expect(spyTargetObject1Trigger.callCount).toEqual(1);
                });

            });


            describe("Given the first target object is unregistered with the event 'mockTargetEvent' from the source object", function () {

                var data;

                beforeEach(function () {

                    // The complicated bit
                    mediator.unregister({
                        source: [{
                            subscriber: sourceObject0,
                            event: 'mock:event'
                        }],
                        target: [{
                            subscriber: targetObject0,
                            event: 'mockTargetEvent'
                        }]
                    });

                });

                describe("When the event 'event:sourceObject' is triggered on the source object", function () {

                    var spyTargetObject0Trigger,
                        spyTargetObject1Trigger;

                    beforeEach(function () {

                        spyTargetObject0Trigger = spyOn( targetObject0, "trigger");
                        spyTargetObject1Trigger = spyOn( targetObject1, "trigger");

                        // The action happens here!!
                        sourceObject0.trigger( "mock:event", data );

                    });

                    it("Should NOT trigger the event on targetObject0", function() {
                        expect(spyTargetObject0Trigger).not.toHaveBeenCalled();
                    });

                    it("Should STILL trigger the event on targetObject1", function() {
                        expect(spyTargetObject1Trigger).toHaveBeenCalled();
                    });

                });

            });

            describe("Given the first target object is unregistered with the event 'mockTargetEvent' from the source object", function () {

                var data;

                beforeEach(function () {

                    // The complicated bit
                    mediator.unregister({
                        source: [{
                            subscriber: sourceObject0,
                            event: 'mock:event'
                        }],
                        target: [{
                            subscriber: targetObject0,
                            event: 'mockTargetEvent'
                        }, {
                            subscriber: targetObject1,
                            event: 'mockTargetEvent'
                        }]
                    });

                });

                describe("When the event 'event:sourceObject' is triggered on the source object", function () {

                    var spyTargetObject0Trigger,
                        spyTargetObject1Trigger;

                    beforeEach(function () {

                        spyTargetObject0Trigger = spyOn( targetObject0, "trigger");
                        spyTargetObject1Trigger = spyOn( targetObject1, "trigger");

                        // The action happens here!!
                        sourceObject0.trigger( "mock:event", data );

                    });

                    it("Should NOT trigger the event on targetObject0", function() {
                        expect(spyTargetObject0Trigger).not.toHaveBeenCalled();
                    });

                    it("Should NOT trigger the event on targetObject1", function() {
                        expect(spyTargetObject1Trigger).not.toHaveBeenCalled();
                    });

                });

            });

            describe("Given the first target object is unregistered with the event 'non-existent:event' from the source object", function () {

                var data;

                beforeEach(function () {

                    // The complicated bit
                    mediator.unregister({
                        source: [{
                            subscriber: sourceObject0,
                            event: 'mock:event'
                        }],
                        target: [{
                            subscriber: targetObject0,
                            event: 'non-existent:event'
                        }]
                    });

                });

                describe("When the event 'event:sourceObject' is triggered on the source object", function () {

                    var spyTargetObject0Trigger,
                        spyTargetObject1Trigger;

                    beforeEach(function () {

                        spyTargetObject0Trigger = spyOn( targetObject0, "trigger");
                        spyTargetObject1Trigger = spyOn( targetObject1, "trigger");

                        // The action happens here!!
                        sourceObject0.trigger( "mock:event", data );

                    });

                    it("Should STILL trigger the event on targetObject0", function() {
                        expect(spyTargetObject0Trigger).toHaveBeenCalled();
                    });

                    it("Should STILL trigger the event on targetObject1", function() {
                        expect(spyTargetObject1Trigger).toHaveBeenCalled();
                    });

                });
            });

        });

        describe("Given two target objects are registered with the event 'target:event' to the event 'source:event' on two source objects", function () {

            var data;

            beforeEach(function () {

                // Arbitrary event data
                data = { page: 1, totalResults: 1000 };


                // The registration in configuration style
                mediator.register({
                    source: [{
                        subscriber: sourceObject0,
                        event: 'source:event'
                    }, {
                        subscriber: sourceObject1,
                        event: 'source:event'
                    }],
                    target: [{
                        subscriber: targetObject0,
                        event: 'target:event'
                    }, {
                        subscriber: targetObject1,
                        event: 'target:event'
                    }]
                });

            });

            describe("When the event 'source:event' is triggered on the first source object", function () {

                var spyTarget0Trigger,
                    spyTarget1Trigger;

                beforeEach(function () {

                    spyTarget0Trigger = spyOn( targetObject0, "trigger");
                    spyTarget1Trigger = spyOn( targetObject1, "trigger");

                    // The action happens here!!
                    sourceObject0.trigger( "source:event", data );

                });

                it("Should trigger the event 'target:event' on the first target", function() {
                    expect(spyTarget0Trigger).toHaveBeenCalledWith("target:event", data);
                });

                it("Should trigger the event 'target:event' on the first target only once", function () {
                    expect(spyTarget0Trigger.callCount).toEqual(1);
                });

                it("Should trigger the event 'target:event' on the second target", function() {
                    expect(spyTarget1Trigger).toHaveBeenCalledWith("target:event", data);
                });

                it("Should trigger the event 'target:event' on the second target only once", function () {
                    expect(spyTarget1Trigger.callCount).toEqual(1);
                });

            });

            describe("When the event 'source:event' is triggered on the second source object", function () {

                var spyTarget0Trigger,
                    spyTarget1Trigger;

                beforeEach(function () {

                    spyTarget0Trigger = spyOn( targetObject0, "trigger");
                    spyTarget1Trigger = spyOn( targetObject1, "trigger");

                    // The action happens here!!
                    sourceObject1.trigger( "source:event", data );

                });

                it("Should trigger the event 'target:event' on the first target", function() {
                    expect(spyTarget0Trigger).toHaveBeenCalledWith("target:event", data);
                });

                it("Should trigger the event 'target:event' on the first target only once", function () {
                    expect(spyTarget0Trigger.callCount).toEqual(1);
                });

                it("Should trigger the event 'target:event' on the second target", function() {
                    expect(spyTarget1Trigger).toHaveBeenCalledWith("target:event", data);
                });

                it("Should trigger the event 'target:event' on the second target only once", function () {
                    expect(spyTarget1Trigger.callCount).toEqual(1);
                });

            });
        });


        describe("Given a target object is registered with the event 'target:event' to the event 'source:event' on a source object", function () {

            var data;

            beforeEach(function () {

                // Arbitrary event data
                data = { page: 1, totalResults: 1000 };


                // The registration in configuration style
                mediator.register({
                    source: [{
                        subscriber: sourceObject0,
                        event: 'source:event'
                    }],
                    target: [{
                        subscriber: targetObject0,
                        event: 'target:event'
                    }]
                });

            });

            describe("When the target is registered as the source with event 'alt:source:event' with the source as the target with alt:target:event", function () {


                beforeEach(function () {
                    // The registration in configuration style
                    mediator.register({
                        source: [{
                            subscriber: targetObject0,
                            event: 'alt:source:event'
                        }],
                        target: [{
                            subscriber: sourceObject0,
                            event: 'alt:target:event'
                        }]
                    });
                });


                describe("When the event 'alt:source:event' is triggered on the new source object", function () {

                    var spyAltTargetTrigger;

                    beforeEach(function () {

                        spyAltTargetTrigger = spyOn( sourceObject0, "trigger");

                        // The action happens here!!
                        targetObject0.trigger( "alt:source:event", data );

                    });

                    it("Should trigger the event 'target:event' on the first target", function() {
                        expect(spyAltTargetTrigger).toHaveBeenCalledWith("alt:target:event", data);
                    });

                });

            });

        });

    });

    describe("Given a target is registered with event 'target:event:number:1' on source with event 'source:event:number:1'", function () {

        var mediator = null,
            source1 = null,
            source2 = null,
            target1 = null,
            target2 = null;


        beforeEach(function () {

            // Alias mediator singleton
            mediator = Truss.Mediator;

            source1 = _.extend({
                name: 'source1'
            }, Backbone.Events);

            source2 = _.extend({
                name: 'source2'
            }, Backbone.Events);

            target1 = _.extend({
                name: 'target1'
            }, Backbone.Events);

            target2 = _.extend({
                name: 'target2'
            }, Backbone.Events);

        });

        afterEach(function () {

            mediator = null;
            source1 = null;
            source2 = null;
            target1 = null;
            target2 = null;

        });

        beforeEach(function () {

            mediator.from(source1, "source:event:number:1").to(target1, "target:event:number:1");

        });

        describe("Given a target is registered with event 'target:event:number:2' on source with event 'source:event:number:2'", function () {

            beforeEach(function () {

                mediator.from(source1, "source:event:number:1").to(target1, "target:event:number:2");

            });

            describe("When target1 is unregistered from event 'source:event:number:1' on source1", function () {

                var spyTarget1Trigger;

                beforeEach(function () {

                    spyTarget1Trigger = spyOn(target1, "trigger");

                    // Ignore all target1 bound events to the specific source1 event
                    mediator.remove( target1 ).from(source1, "source:event:number:1");

                    // Trigger the source event
                    source1.trigger("source:event:number:1");

                });

                it("Should NOT trigger any target1 events", function () {
                   expect( spyTarget1Trigger ).not.toHaveBeenCalled();
                });

            });

        });
    });

    describe("Given a target is registered with event 'target:event:number:1' on source with event 'source:event:number:1'", function () {

        var mediator = null,
            source1 = null,
            source2 = null,
            target1 = null,
            target2 = null;


        beforeEach(function () {

            // Alias mediator singleton
            mediator = Truss.Mediator;

            source1 = _.extend({
                name: 'source1'
            }, Backbone.Events);

            source2 = _.extend({
                name: 'source2'
            }, Backbone.Events);

            target1 = _.extend({
                name: 'target1'
            }, Backbone.Events);

            target2 = _.extend({
                name: 'target2'
            }, Backbone.Events);

        });

        afterEach(function () {

            mediator = null;
            source1 = null;
            source2 = null;
            target1 = null;
            target2 = null;

        });

        beforeEach(function () {

            mediator.from(source1, "source:event:number:1").to(target1, "target:event:number:1");

        });

        describe("Given a target is registered with event 'target:event:number:2' on source with event 'source:event:number:2'", function () {

            beforeEach(function () {

                mediator.from(source1, "source:event:number:1").to(target1, "target:event:number:2");

            });

            describe("When event 'target:event:number:1' is unregistered from event 'source:event:number:1' on source1", function () {

                var spyTarget1Trigger;

                beforeEach(function () {

                    spyTarget1Trigger = spyOn(target1, "trigger");

                    // Ignore all target1 bound events to the specific source1 event
                    mediator.remove( null, "target:event:number:1" ).from(source1, "source:event:number:1");

                    // Trigger the source event
                    source1.trigger("source:event:number:1", {});

                });

                it("Should NOT trigger 'target:event:number:1' event", function () {
                    expect( spyTarget1Trigger ).not.toHaveBeenCalledWith("target:event:number:1");
                });

                it("Should trigger 'target:event:number:2' event", function () {
                    expect( spyTarget1Trigger ).toHaveBeenCalledWith("target:event:number:2", {});
                });

            });

        });
    });


    describe("When remove is called with no arguments", function () {

        var mediator = null;

        beforeEach(function () {

            // Alias mediator singleton
            mediator = Truss.Mediator;

        });

        afterEach(function () {

            mediator = null;

        });

        it("Should throw 'Remove cannot be called without arguments'", function () {
            expect(function () {
                mediator.remove();
            }).toThrow("Remove cannot be called without arguments");
        });
    });

    describe("When unregister is called without a configuration object", function () {

        var mediator = null;

        beforeEach(function () {

            // Alias mediator singleton
            mediator = Truss.Mediator;

        });

        afterEach(function () {

            mediator = null;

        });

        it("Should throw 'Unregister cannot be called without a configuration argument", function () {
            expect(function () {
                mediator.unregister();
            }).toThrow("Unregister cannot be called without arguments");
        });
    });


    describe("When 'from' is called without any arguments", function () {

        var mediator = null;

        beforeEach(function () {
            // Alias mediator singleton
            mediator = Truss.Mediator;

        });

        afterEach(function () {
            mediator = null;
        });

        it("Should throw 'From cannot be called with no arguments", function () {
            expect(function () {
                mediator.from();
            }).toThrow("From cannot be called with no arguments");
        });
    });

    describe("When 'to' is called before 'from'", function () {

        var mediator = null;

        beforeEach(function () {
            // Alias mediator singleton
            mediator = Truss.Mediator;

        });

        afterEach(function () {
            mediator = null;
        });

        it("Should throw 'Cannot call to before from'", function () {
            expect(function () {
                mediator.to();
            }).toThrow("Cannot call to before from.");
        });
    });

    describe("When 'register' is called using a configuration object and the configuration object doesn't have as keys 'target' or 'source'", function () {

        var mediator = null;

        beforeEach(function () {
            // Alias mediator singleton
            mediator = Truss.Mediator;

        });

        afterEach(function () {
            mediator = null;
        });

        it("Should throw 'Config object needs a source'", function () {
            expect(function () {
                mediator.register({ target: {} });
            }).toThrow("Config object needs a source defined.");
        });

        it("Should throw 'Config object needs a target'", function () {
            expect(function () {
                mediator.register({ source: {} });
            }).toThrow("Config object needs a target defined.");
        });

    });

    describe("When 'unregister' is called using a configuration object and the configuration object doesn't have as keys 'target' or 'source'", function () {

        var mediator = null;

        beforeEach(function () {
            // Alias mediator singleton
            mediator = Truss.Mediator;

        });

        afterEach(function () {
            mediator = null;
        });

        it("Should throw 'Config object needs a source'", function () {
            expect(function () {
                mediator.unregister({ target: {} });
            }).toThrow("Config object needs a source defined.");
        });

        it("Should throw 'Config object needs a target'", function () {
            expect(function () {
                mediator.unregister({ source: {} });
            }).toThrow("Config object needs a target defined.");
        });

    });*/

});
