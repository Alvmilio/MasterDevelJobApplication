interface credential{
    key : string,
    shared_secret : string
};

interface message{
    id : number,
    msg : string,
    tags : Array<string>
};

let currentMessageID = 0;
export const credentials = new Array<credential>();
export const messages = new Array<message>();

export function keyAlreadyExists(key : string) : boolean
{
    for(var i = 0; i < credentials.length; i++)
    {
        if(credentials[i].key == key)
            return true;
    }
    return false;
}

export function getNewMessageID() : number
{
    return currentMessageID++;
}

function getCredential(key : string)
{
    for(var i = 0; i < credentials.length; i++)
    {
        if(credentials[i].key == key)
            return credentials[i];
    }
    return null;
}

export function isValidSignature(key : any, requestBody : any, requestParams : any, xrouteHeader : any, receivedSignature : any) : boolean
{
    console.log("desde isValidSignature");
    console.log(requestParams);
    console.log(xrouteHeader);
    console.log(requestBody);
    if(xrouteHeader == '/message')
    {
        let correctHash = getCorrectHashForPostMessageRoute(key, requestBody, requestParams, xrouteHeader);
        console.log("CorrectHash -> "+correctHash);
        console.log("ReceivedHash -> "+receivedSignature);
        if(correctHash == receivedSignature)
        {
            console.log("Si son iguales!!");
        }
        else
            console.log("No son iguales");
    }

    return false;
}

function getCorrectHashForPostMessageRoute(key : any, requestBody : any, requestParams : any, xrouteHeader : any) : string
{
    let tuples = [];
    tuples.push('msg:'+requestBody.msg);
    tuples.push('tags:'+requestBody.tags);
    tuples.push('X-Route:'+xrouteHeader);
    console.log(tuples);
    tuples.sort();
    console.log("Sorted");
    console.log(tuples);
    let finalString : string="";
    for(let i = 0; i < tuples.length; i++)
    {
        
        finalString+=tuples[i];
        finalString = i+1 == tuples.length ? finalString : finalString+=";";
    }
    console.log(finalString);
    let credentialToUse = null;
    credentialToUse = getCredential(key);
    console.log(credentialToUse);

    console.log("CredentialKey ->"+credentialToUse.key);
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', credentialToUse.shared_secret);
    hmac.update(finalString);
    var hashVal = hmac.digest('hex');
    console.log("Final->"+hashVal);
    return hashVal;
}