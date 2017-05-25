"use strict";

var Setrada = {};

Setrada.Config = function (address, port) {
    this.constructor = function (address, port) {
        this.address = address;
        this.port = port || 80;

        if (typeof this.address !== 'number' && typeof this.port === 'number') {
            this.url = this.address + ':' + this.port;
            console.log('url: ' + this.url);
        } else {
            throw {
                name: 'TypeError',
                message: 'address needs to be a string and port a number'
            };
        }
    };

    this.valid = function () {
        return this.url ? true : false;
    };

    this.constructor(address, port);
};

Setrada.setConfig = function (address, port) {
    var newConfig = new Setrada.Config(address, port);

    if (newConfig.valid()) {
        Setrada.config = newConfig;
    } else {
        throw {
            name: 'SetradaConfigurationInvalid',
            message: 'Setrada is not properly configured, keeping previous.'
        };
    }
};

Setrada.Fetcher = function (path, callback) {
    this.constructor = function (path, callback) {
        this.path = path;
        this.callback = callback || function (responseText) {
            console.log(responseText);
        };

        if (Setrada.config && Setrada.config.valid()) {
            this.url = Setrada.config.url + '/' + path;
        } else {
            throw {
                name: 'SetradaNotConfigured',
                message: 'run Setrada.setConfig first.'
            };
        }
    };

    this.fetch = function () {
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                this.callback(xhr.responseText);
            } else {
                console.log('catapam');
            }
        };

        xhr.open('get', this.url, true);
        xhr.send();
    };

    this.constructor(path, callback);
};

