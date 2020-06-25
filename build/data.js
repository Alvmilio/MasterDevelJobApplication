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
function getMessageByID(id) {
    for (var i = 0; i < exports.messages.length; i++) {
        if (exports.messages[i].id == id)
            return exports.messages[i];
    }
    return null;
}
exports.getMessageByID = getMessageByID;
function getMessagesByTag(tag) {
    var fetchedMessages = [];
    for (var i = 0; i < exports.messages.length; i++) {
        for (var j = 0; j < exports.messages[i].tags.length; j++) {
            if (exports.messages[i].tags[j] == tag)
                fetchedMessages.push(exports.messages[i].msg);
        }
    }
    return fetchedMessages;
}
exports.getMessagesByTag = getMessagesByTag;
function isValidSignature(key, requestBody, requestParams, xrouteHeader, receivedSignature) {
    console.log('desde isValidSignature');
    console.log(requestParams);
    console.log(xrouteHeader);
    console.log(requestBody);
    var correctHash = getCorrectHash(key, requestBody, requestParams, xrouteHeader);
    if (correctHash == receivedSignature) {
        console.log('Si son iguales!!');
        return true;
    }
    else {
        console.log('No son iguales');
        console.log("XSignature -> " + receivedSignature + " VS CorrectHash -> " + correctHash);
    }
    return false;
}
exports.isValidSignature = isValidSignature;
function getCorrectHash(key, requestBody, requestParams, xrouteHeader) {
    var tuples = [];
    if (xrouteHeader == '/message') {
        tuples.push('msg:' + requestBody.msg);
        tuples.push('tags:' + requestBody.tags);
        tuples.push('X-Route:' + xrouteHeader);
    }
    else if (xrouteHeader == '/message/<id>') {
        tuples.push('id:' + requestParams.id);
        tuples.push('X-Route:' + xrouteHeader);
    }
    else {
        tuples.push('tag:' + requestParams.tag);
        tuples.push('X-Route:' + xrouteHeader);
    }
    tuples.sort();
    console.log("Sorted");
    console.log(tuples);
    var finalString = "";
    for (var i = 0; i < tuples.length; i++) {
        finalString += tuples[i];
        finalString = i + 1 == tuples.length ? finalString : finalString += ";";
    }
    console.log("StringToHash->" + finalString);
    var credentialToUse = null;
    credentialToUse = getCredential(key);
    //console.log(credentialToUse);
    //console.log("CredentialKey ->"+credentialToUse.key);
    var crypto = require('crypto');
    var hmac = crypto.createHmac('sha256', credentialToUse.shared_secret);
    hmac.update(finalString);
    var hashVal = hmac.digest('hex');
    console.log("HashedString->" + hashVal);
    return hashVal;
}
