define(['Base'], function (Base) {

    function XHR() {

        var xhr, ctx = this;

        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                xhr = new window.ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {}
            }
        }

        xhr.onreadystatechange = function (resp) {
            response.call(ctx, resp);
        };

        return xhr;
    }

    function response(resp) {
        try {
            if (resp.readyState === 4) {
                if (resp.statusCode === 200) {
                    this.success(resp);
                } else {
                    this.failure(resp);
                }
            }
        } catch( e ) {
            this.error();
        }
    }

    return Base.construct({

        start: function () {
            this.xhr = XHR.call(this);
        },

        ajax: function (data) {
            this.xhr.open(data.method, data.url, true);
            this.xhr.send(data.query || null);
        },

        get: function (url) {
            this.ajax({method: 'GET', url: url});
        },

        post: function (url, query) {
            if (this.isFunction(this.xhr.setRequestHeader)) {
                //this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }
            this.ajax({method: 'POST', url: url, query: query});
        },

        success: function () {},

        failure: function () {},

        error: function () {}

    });

});

