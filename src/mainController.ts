import {Response, Request} from 'express';
import {credentials} from './data';
import {messages} from './data';
import {keyAlreadyExists} from './data';
import {getNewMessageID} from './data';
import {isValidSignature } from './data';

class MainController
{
    credentials : Array<any> = new Array();
    constructor(){}


    putCredential(req : Request, res : Response)
    {
        console.log("on PUT /credential");
        console.log(req.body);
        
        if(keyAlreadyExists(req.body.key))
            res.status(403).send('Key already exists');
        else
        {
            credentials.push({  key: req.body.key,
                                shared_secret: req.body.shared_secret
                            });
            console.log("New credential stored");
            console.log(credentials);
            res.status(204).send("New credential stored!")
        }
        console.log("------------------");
        
    }



    postMessage(req : Request, res : Response)
    {
        console.log("on POST /message");
        console.log(req.body);
        console.log("XKey header content ->"+req.headers.xkey);
        console.log("XRoute header content ->"+req.headers.xroute);
        console.log("XSignature header content ->"+req.headers.xsignature);
        console.log("Current message ID ->"+getNewMessageID());
        res.send("hola");
        isValidSignature(req.headers.xkey, req.body, req.params, req.headers.xroute, req.headers.xsignature);
    }

    async getMessageByID(req : Request, res : Response) : Promise<void>
    {
        console.log("on GET /message/"+req.params.id);
        res.json({message:'received'});
    }

    async getMessagesByTag(req : Request, res : Response) : Promise<void>
    {
        console.log("on GET /messages/"+req.params.tag);
        res.json({message:'received'});
    }
}

export const mainController = new MainController();
