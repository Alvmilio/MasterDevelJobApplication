"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.credentials = new Array();
exports.messages = new Array();
function keyAlreadyExists(key) {
    for (var i = 0; i < exports.credentials.length; i++) {
        if (exports.credentials[i].key == key)
            return true;
    }
    return false;
}
exports.keyAlreadyExists = keyAlreadyExists;
