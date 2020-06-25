"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
var currentMessageID = 0;
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
function getNewMessageID() {
    return currentMessageID++;
}
exports.getNewMessageID = getNewMessageID;
function getCredential(key) {
    for (var i = 0; i < exports.credentials.length; i++) {
        if (exports.credentials[i].key == key)
            return exports.credentials[i];
    }
    return null;
}
function isValidSignature(key, requestBody, requestParams, xrouteHeader, receivedSignature) {
    console.log("desde isValidSignature");
    console.log(requestParams);
    console.log(xrouteHeader);
    console.log(requestBody);
    if (xrouteHeader == '/message') {
        var correctHash = getCorrectHashForPostMessageRoute(key, requestBody, requestParams, xrouteHeader);
        console.log("CorrectHash -> " + correctHash);
        console.log("ReceivedHash -> " + receivedSignature);
        if (correctHash == receivedSignature) {
            console.log("Si son iguales!!");
        }
        else
            console.log("No son iguales");
    }
    return false;
}
exports.isValidSignature = isValidSignature;
function getCorrectHashForPostMessageRoute(key, requestBody, requestParams, xrouteHeader) {
    var tuples = [];
    tuples.push('msg:' + requestBody.msg);
    tuples.push('tags:' + requestBody.tags);
    tuples.push('X-Route:' + xrouteHeader);
    console.log(tuples);
    tuples.sort();
    console.log("Sorted");
    console.log(tuples);
    var finalString = "";
    for (var i = 0; i < tuples.length; i++) {
        finalString += tuples[i];
        finalString = i + 1 == tuples.length ? finalString : finalString += ";";
    }
    console.log(finalString);
    var credentialToUse = null;
    credentialToUse = getCredential(key);
    console.log(credentialToUse);
    console.log("CredentialKey ->" + credentialToUse.key);
    var crypto = require('crypto');
    var hmac = crypto.createHmac('sha256', credentialToUse.shared_secret);
    hmac.update(finalString);
    var hashVal = hmac.digest('hex');
    console.log("Final->" + hashVal);
    return hashVal;
}
