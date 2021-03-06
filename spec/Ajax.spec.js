require(['ajax'], function (ajax) {

    describe('ajax', function () {

        describe('successful GET request', function () {

            var spySuccess,
                spyOpen,
                spySend,
                url = 'path/to/file',
                response = {readyState: 4, statusCode: 200};

            beforeEach(function () {
                spyOpen = spyOn(ajax.xhr, 'open').andCallThrough();
                spySend = spyOn(ajax.xhr, 'send').andCallFake(function () {
                    ajax.xhr.onreadystatechange(response);
                });
                spySuccess = spyOn(ajax, 'success');
                ajax.update({url: url});
            });

            it('makes a GET request to url', function () {
                expect(spyOpen).toHaveBeenCalledWith('GET', url, true);
            });

            it('calls send', function () {
                expect(spySend).toHaveBeenCalled();
            });

            it('calls success with response object', function () {
                expect(spySuccess).toHaveBeenCalledWith(response);
            });

        });

        describe('failed GET request', function () {

            var spyFailure,
                spyOpen,
                spySend,
                url = 'path/to/file',
                response = {readyState: 4, statusCode: 400};

            beforeEach(function () {
                spyOpen = spyOn(ajax.xhr, 'open');
                spySend = spyOn(ajax.xhr, 'send').andCallFake(function () {
                    ajax.xhr.onreadystatechange(response);
                });
                spyFailure = spyOn(ajax, 'failure');
                ajax.update({url: url});
            });

            it('makes a GET request to url', function () {
                expect(spyOpen).toHaveBeenCalledWith('GET', url, true);
            });

            it('calls send', function () {
                expect(spySend).toHaveBeenCalled();
            });

            it('calls success with response object', function () {
                expect(spyFailure).toHaveBeenCalledWith(response);
            });

        });

        describe('successfully POST a JSON query', function () {

            var spySuccess,
                spyOpen,
                spySend,
                url = 'path/to/file',
                JSON = '{"key": "value"}',
                response = {readyState: 4, statusCode: 200};

            beforeEach(function () {
                spyOpen = spyOn(ajax.xhr, 'open').andCallThrough();
                spySend = spyOn(ajax.xhr, 'send').andCallFake(function () {
                    ajax.xhr.onreadystatechange(response);
                });
                spySuccess = spyOn(ajax, 'success');
                ajax.post({url: url, data: JSON});
            });

            it('makes a POST request to url', function () {
                expect(spyOpen).toHaveBeenCalledWith('POST', url, true);
            });

            it('calls send with the JSON', function () {
                expect(spySend).toHaveBeenCalledWith(JSON);
            });

            it('calls success with response object', function () {
                expect(spySuccess).toHaveBeenCalledWith(response);
            });

        });

        describe('successfully POST a string query', function () {

            var spySuccess,
                spyOpen,
                spySend,
                url = 'path/to/file',
                query = 'name=value&anothername=value2&so=on',
                response = {readyState: 4, statusCode: 200};

            beforeEach(function () {
                spyOpen = spyOn(ajax.xhr, 'open').andCallThrough();
                spySend = spyOn(ajax.xhr, 'send').andCallFake(function () {
                    ajax.xhr.onreadystatechange(response);
                });
                spySuccess = spyOn(ajax, 'success');
                ajax.post({url: url, data: query});
            });

            it('makes a POST request to url', function () {
                expect(spyOpen).toHaveBeenCalledWith('POST', url, true);
            });

            it('calls send with the query', function () {
                expect(spySend).toHaveBeenCalledWith(query);
            });

            it('calls success with response object', function () {
                expect(spySuccess).toHaveBeenCalledWith(response);
            });

        });

    });

});