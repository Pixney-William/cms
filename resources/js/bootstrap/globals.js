import marked from 'marked';
import { translate, translateChoice } from '../translations/translator';

global.cp_url = function(url) {
    url = Statamic.$config.get('cpRoot') + '/' + url;
    return url.replace(/([^:]\/)\/+/g, '/');
};

global.resource_url = function(url) {
    url = Statamic.$config.get('resourceUrl') + '/' + url;
    return url.replace(/([^:]\/)\/+/g, '/');
};

// Get url segments from the nth segment
global.get_from_segment = function(count) {
    return Statamic.$config.get('urlPath').split('/').splice(count).join('/');
};

global.file_icon = function(extension) {
    return resource_url('img/filetypes/'+ extension +'.png');
};

global.dd = function(args) {
    console.log(args);
};

global.data_get = function(obj, path, fallback=null) {
    // Source: https://stackoverflow.com/a/22129960
    var properties = Array.isArray(path) ? path : path.split('.');
    var value = properties.reduce((prev, curr) => prev && prev[curr], obj);
    return value !== undefined ? value : fallback;
};

global.clone = function (value) {
    if (value === undefined) return undefined;

    return JSON.parse(JSON.stringify(value));
}

global.Cookies = require('cookies-js');

global.tailwind_width_class = function (width) {
    const widths = {
        25: '1/4',
        33: '1/3',
        50: '1/2',
        66: '2/3',
        75: '3/4',
        100: 'full'
    };

    return `w-${widths[width] || 'full'}`;
}

global.markdown = function (value) {
    return marked(value);
};

global.__ = function (string, replacements) {
    return translate(string, replacements);
}
global.__n = function (string, number, replacements) {
    return translateChoice(string, number, replacements);
}
