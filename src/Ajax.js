define(function () {

    var xhr;

    (function () {

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

        xhr.onreadystatechange = function (res) {
            ajax.response(res);
        };

    }());

    var ajax = {

        xhr: xhr,

        response: function(resp) {
            try {
                if (resp.readyState === 4) {
                    if (resp.statusCode === 200) {
                        this.success(resp);
                    } else {
                        this.failure(resp);
                    }
                }
            } catch( e ) {
                this.error(e);
            }
        },

        request: function (data) {
            if (!xhr) {
                this.setXHR();
            }
            xhr.open(data.method, data.url, true);
            xhr.send(data.query || null);
        },

        get: function (url) {
            this.request({method: 'GET', url: url});
        },

        post: function (url, query) {
            // if (this.isFunction(xhr.setRequestHeader)) {
            //     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            // }
            this.request({method: 'POST', url: url, query: query});
        },

        success: function () {},

        failure: function () {},

        error: function (e) {}

    };

    return ajax;

});

