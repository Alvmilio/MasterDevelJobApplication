interface credential{
    key : string,
    shared_secret : string
};

interface message{
    id : number,
    msg : string,
    tags : Array<string>
};

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