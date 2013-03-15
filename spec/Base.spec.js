require( ['Base'], function ( Base ) {

    describe("Base", function () {

        describe("When Base has not been created", function () {

            it("it has a static construct function", function () {
                expect(typeof Base.construct).toEqual("function");
            });

            it("it has a static mixin function", function () {
                expect(typeof Base.mixin).toEqual("function");
            });

        });

        describe('Invoking Base.mixin', function () {

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
