// https://www.codespot.org/javascript-email-validation/
module.exports.emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// https://urlregex.com/
module.exports.urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

module.exports.validateEmail = [(value) => {
    return module.exports.emailRegEx.test(value);
}, "Path `{PATH}` expects a valid email address."]

module.exports.validateURL = [(value) => {
    return module.exports.urlRegEx.test(value);
}, "Path `{PATH}` expects a valid URL."]