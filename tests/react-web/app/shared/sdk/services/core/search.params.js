
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module JSONSearchParams
* @license MIT
* @description
* JSON Parser and Wrapper for the Angular2 URLSearchParams
* This module correctly encodes a json object into a query string and then creates
* an instance of the URLSearchParams component for later use in HTTP Calls
**/

export class JSONSearchParams {

    _usp;

    setJSON(obj) {

        this._usp = this._JSON2URL(obj, false);

    }

    getURLSearchParams() {
        return this._usp;
    }

    _JSON2URL(obj, parent) {
        var parts = [];
        for (var key in obj)
        parts.push(this._parseParam(key, obj[key], parent));
        return parts.join('&');
    }

    _parseParam(key, value, parent) {
        let processedKey = parent ? parent + '[' + key + ']' : key;
        if (value && ((typeof value) === 'object' || Array.isArray(value))) {
            return this._JSON2URL(value, processedKey);
        }
        return processedKey + '=' + value;
    }
}

