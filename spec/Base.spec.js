require( ['Base', 'events', 'utils'], function ( Base, events, utils ) {

    describe("Base", function () {

        describe("When Base has not been created", function () {
            it("it has a static construct function", function () {
                expect(typeof Base.construct).toEqual("function");
            });
            it("it has a static mixin function", function () {
                expect(typeof Base.mixin).toEqual("function");
            });
        });

        describe('prototype', function () {
            it('has events mixin', function () {
                for (var i in events) {
                    expect(i in Base.prototype).toEqual(true);
                }
            });
            it('has utils mixin', function () {
                for (var i in utils) {
                    expect(i in Base.prototype).toEqual(true);
                }
            });
        });

        describe('Invoking Base.mixin', function () {

            describe('with empty destination object and simple source object', function () {
                var mixed, source = {sProp: 'sVal'};

                beforeEach(function () {
                    mixed = Base.mixin({}, source);
                });

                it('returns a copy of the source object', function () {
                    expect(mixed).toEqual(source);
                });

            });

            describe('with simple destination object and simple source object', function () {
                var mixed, source = {sProp: 'sVal'};

                beforeEach(function () {
                    mixed = Base.mixin({dProp: 'dVal'}, source);
                });

                it('returns a copy of the source object', function () {
                    expect(mixed).toEqual({dProp:'dVal', sProp:'sVal'});
                });

            });

            describe('with simple destination object and complex source object', function () {
                var mixed,
                    source = {
                        sNode: {
                            node: {
                                property: 'value'
                            }
                        }
                    };

                beforeEach(function () {
                    mixed = Base.mixin({dProp: 'dVal'}, source);
                });

                it('returns a copy of the source object', function () {
                    expect(mixed).toEqual({dProp:'dVal', sNode: { node: { property: 'value' } }});
                });

            });

            describe('with simple destination object and complex source object with a method', function () {
                var mixed,
                    source = {
                        sNode: {
                            node: {
                                method: function () {
                                    return 'it works';
                                }
                            }
                        }
                    };

                beforeEach(function () {
                    mixed = Base.mixin({dProp: 'dVal'}, source);
                });

                it('returns a copy of the source object with the method', function () {
                    expect(mixed.sNode.node.method).toBeDefined();
                });

                it('can call the method', function () {
                    expect(mixed.sNode.node.method()).toEqual('it works');
                });

            });

            describe('with simple destination object and several simple source objects', function () {
                var mixed,
                    source1 = {prop1: 'val1'},
                    source2 = {prop2: 'val2'},
                    source3 = {prop3: 'val3'};

                beforeEach(function () {
                    mixed = Base.mixin({dProp: 'dVal'}, source1, source2, source3);
                });

                it('returns a copy of the source objects', function () {
                    expect(mixed.prop1).toEqual('val1');
                    expect(mixed.prop2).toEqual('val2');
                    expect(mixed.prop3).toEqual('val3');
                });

            });

            describe('with complex destination object with method and several simple source objects', function () {
                var mixed,
                    dest = {
                        dNode: {
                            node: {
                                dProp: 'dVal',
                                dMethod: function () {
                                    return this.dProp;
                                }
                            }
                        }
                    },
                    source1 = {prop1: 'val1'},
                    source2 = {prop2: 'val2'},
                    source3 = {prop3: 'val3'};

                beforeEach(function () {
                    mixed = Base.mixin(dest, source1, source2, source3);
                });

                it('returns a copy of the source objects', function () {
                    expect(mixed.prop1).toEqual('val1');
                    expect(mixed.prop2).toEqual('val2');
                    expect(mixed.prop3).toEqual('val3');
                });

                it('still has the original property', function () {
                    expect(mixed.dNode.node.dProp).toBeDefined();
                });

                it('still has the original, callable method', function () {
                    expect(mixed.dNode.node.dMethod()).toEqual('dVal');
                });

            });

            describe('with complex destination object and two complex source objects', function () {
                var mixed,
                    dest = {
                        node: {
                            dProp: 'destination value',
                            dMethod: function () {
                                return this.dProp;
                            }
                        }
                    },
                    source1 = {
                        node: {
                            prop1: 'source 1 value',
                            method1: function () {
                                return this.prop1;
                            }
                        }
                    },
                    source2 = {
                        node: {
                            prop2: 'source 2 value',
                            method2: function () {
                                return this.prop2;
                            }
                        }
                    };


                beforeEach(function () {
                    mixed = Base.mixin(dest, source1, source2);
                });

                it('returns a copy of the source properties to the destination', function () {
                    expect(mixed.node.prop1).toEqual('source 1 value');
                    expect(mixed.node.prop2).toEqual('source 2 value');
                });

                it('adds the source methods to the destination', function () {
                    expect(mixed.node.method1()).toEqual('source 1 value');
                    expect(mixed.node.method2()).toEqual('source 2 value');
                });

                it('still has the original property', function () {
                    expect(mixed.node.dProp).toEqual('destination value');
                });

                it('still has the original, callable method', function () {
                    expect(mixed.node.dMethod()).toEqual('destination value');
                });

            });

        });

        describe("Invoking Base.construct", function () {

            var factory, spyStart;

            beforeEach(function () {
                spyStart = jasmine.createSpy('start');

                factory = Base.construct({
                    start: spyStart,
                    name: 'one',
                    methodOne: function () {
                        return 'one';
                    }
                });
            });

            it('returns a factory function', function () {
                expect(typeof factory).toEqual('function');
            });

            it('the factory function has a construct function', function () {
                expect(typeof factory.construct).toEqual("function");
            });

            it('the factory has a create function', function () {
                expect(typeof factory.create).toEqual("function");
            });

            describe('Invkoing factory.create', function () {

                var factored, opts = {good: 'times'};

                beforeEach(function () {
                    factored = factory.create(opts);
                });

                it('returns a new object', function () {
                    expect(typeof factored).toEqual('object');
                });

                it('new object has name "one"', function () {
                    expect(factored.name).toEqual('one');
                });

                it('new object has methodOne', function () {
                    expect(typeof factored.methodOne).toEqual('function');
                });

                it('invokes start with the options passed to create', function () {
                    expect(spyStart).toHaveBeenCalledWith(opts);
                });

            });

        });

        describe('Invoking factory.construct', function () {

            var anotherFactory, spyStart, spyStartParent;

            beforeEach(function () {
                spyStartParent = jasmine.createSpy('startParent');
                spyStart = jasmine.createSpy('start');

                var factory = Base.construct({
                    start: spyStartParent,
                    name: 'one',
                    methodOne: function () { return 'one'; }
                });
                anotherFactory = factory.construct({
                    start: spyStart,
                    name: 'two',
                    methodTwo: function () { return 'two'; }
                });
            });

            it('returns another factory function', function () {
                expect(typeof anotherFactory).toEqual('function');
            });

            it('the another factory function has a construct function', function () {
                expect(typeof anotherFactory.construct).toEqual("function");
            });

            it('the another factory function has a create function', function () {
                expect(typeof anotherFactory.create).toEqual("function");
            });

            describe('invoking anotherFactory.create', function () {

                var factored, opts = {even: 'better'};

                beforeEach(function () {
                    factored = anotherFactory.create(opts);
                });

                it('returns a new object', function () {
                    expect(typeof factored).toEqual('object');
                });

                it('new object has name "two"', function () {
                    expect(factored.name).toEqual('two');
                });

                it('new object has methodTwo', function () {
                    expect(typeof factored.methodTwo).toEqual('function');
                });

                it('new object has methodOne', function () {
                    expect(typeof factored.methodOne).toEqual('function');
                });

                it('invokes start with the options passed to create', function () {
                    expect(spyStart).toHaveBeenCalledWith(opts);
                });

                it('does not invoke startParent', function () {
                    expect(spyStartParent).not.toHaveBeenCalled();
                });

            });
        });

        describe('Invoking anotherFactory.construct', function () {

            var aNewFactory, spyStart, spyStartParent, spyStartGrandparent;

            beforeEach(function () {
                spyStartGrandparent = jasmine.createSpy('startGrandparent');
                spyStartParent = jasmine.createSpy('startParent');
                spyStart = jasmine.createSpy('start');

                var factory = Base.construct({
                    start: spyStartGrandparent,
                    name: 'one',
                    methodOne: function () { return 'one'; }
                });
                var anotherFactory = factory.construct({
                    start: spyStartParent,
                    name: 'two',
                    methodTwo: function () { return 'two'; }
                });
                aNewFactory = anotherFactory.construct({
                    start: spyStart,
                    name: 'three',
                    methodThree: function () { return 'three'; }
                });
            });

            it('returns a new factory function', function () {
                expect(typeof aNewFactory).toEqual('function');
            });

            it('the new factory function has a construct function', function () {
                expect(typeof aNewFactory.construct).toEqual("function");
            });

            it('the new factory function has a create function', function () {
                expect(typeof aNewFactory.create).toEqual("function");
            });


            describe('invoking aNewFactory.create', function () {

                var factored, opts = {blatantly: 'awesome'};

                beforeEach(function () {
                    factored = aNewFactory.create(opts);
                });

                it('returns a new object', function () {
                    expect(typeof factored).toEqual('object');
                });

                it('new object has name "three"', function () {
                    expect(factored.name).toEqual('three');
                });

                it('new object has methodThree', function () {
                    expect(typeof factored.methodThree).toEqual('function');
                });

                it('new object has methodTwo', function () {
                    expect(typeof factored.methodTwo).toEqual('function');
                });

                it('new object has methodOne', function () {
                    expect(typeof factored.methodOne).toEqual('function');
                });

                it('invokes start with the options passed to create', function () {
                    expect(spyStart).toHaveBeenCalledWith(opts);
                });

                it('does not invoke startParent', function () {
                    expect(spyStartParent).not.toHaveBeenCalled();
                });

                it('does not invoke startGrandParent', function () {
                    expect(spyStartGrandparent).not.toHaveBeenCalled();
                });

                it('even has a link to events#on', function () {
                    expect(typeof factored.on).toEqual('function');
                });
                it('even has a link to events#off', function () {
                    expect(typeof factored.off).toEqual('function');
                });
                it('even has a link to events#fire', function () {
                    expect(typeof factored.fire).toEqual('function');
                });
            });

        });

    });

});
