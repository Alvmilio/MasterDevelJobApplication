import {Response, Request} from 'express';
import {credentials} from './data';
import {messages} from './data';
import {keyAlreadyExists} from './data';

class MainController
{
    credentials : Array<any> = new Array();
    constructor(){}


    putCredential(req : Request, res : Response)
    {
        console.log("on PUT /credential");
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
        
    }



    async postMessage(req : Request, res : Response) : Promise<void>
    {
        console.log("on POST /message");
        res.json({message:'received'});
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
