define( ['utils'], function (utils) {

    var ajax = {

        xhr: (function () {

            var xhr;

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

            return xhr;

        }()),

        mimeType: 'text/plain',

        response: function(res) {
            try {
                if (res.readyState === 4) {
                    if (res.statusCode === 200) {
                        this.success(res);
                        this.fire('ajax:success', res.target.response);
                    } else {
                        this.failure(res);
                    }
                }
            } catch( e ) {
                this.error(e);
            }
        },

        setHeaders: function (data) {
            if (data && utils.isString(data)) {
                try {
                    utils.isObject(JSON.parse(data));
                    this.mimeType = "application/json";
                } catch (e) {}
            }
            this.xhr.setRequestHeader( "Content-Type", this.mimeType );
        },

        request: function (method, options) {
            this.setOptions(options);
            this.xhr.open(method, this.url, true);
            this.setHeaders(this.data);
            this.xhr.send(this.data || null);
        },

        setOptions: function (options) {
            utils.mixin(this, options);
        },

        update: function (options) {
            this.request('GET', options);
        },

        post: function (options) {
            if (!options.data && this.properties) {
                options.data = JSON.stringify(this.properties);
            }
            this.request('POST', options);
        },

        success: function () {},

        failure: function () {},

        error: function (e) {}

    };

    return ajax;

});

