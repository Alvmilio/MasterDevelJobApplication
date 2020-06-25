import {Response, Request} from 'express';
import {credentials} from './data';
import {messages} from './data';

class MainController
{
    credentials : Array<any> = new Array();


    putCredential(req : Request, res : Response)
    {
        console.log("on PUT /credential");
        res.json({message:'received'});
        console.log(req.body);
        console.log("Endof body");

        
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
