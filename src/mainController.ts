import {Response, Request} from 'express';
import {credentials} from './data';
import {messages} from './data';
import {keyAlreadyExists} from './data';
import {getNewMessageID} from './data';
import {isValidSignature } from './data';
import {getMessageByID} from './data';
import {getMessagesByTag} from './data';

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
        //res.send("hola");
        let retVal = isValidSignature(req.headers.xkey, req.body, req.params, req.headers.xroute, req.headers.xsignature);
        if(!retVal)
            res.status(401).send("Invalid credentials! please try again");
        else
        {
            //res.status(201).send();
            
            let tagsArray = req.body.tags.split(",");
            console.log(tagsArray);
            let newMsgID = getNewMessageID();
            messages.push({id:newMsgID, msg: req.body.msg, tags: tagsArray});
            console.log(messages);
            //res.status(201).send("Inserted id !"+newMsgID); since im getting problems while trying to retrieve the inserted ID as message, i'll send it as status code
            //res.status(204).send();
            res.json({message:newMsgID});
        }
    }

    async getMessageByID(req : Request, res : Response) : Promise<void>
    {
        console.log("on GET /message/"+req.params.id);
        let retVal = isValidSignature(req.headers.xkey, req.body, req.params, req.headers.xroute, req.headers.xsignature);
        if(!retVal)
            res.status(401).send("Invalid credentials! please try again");
        else
        {
            
            let message = getMessageByID(+req.params.id);
            //res.status(201).send("Inserted id !"+newMsgID); since im getting problems while trying to retrieve the inserted ID as message, i'll send it as status code
            //res.status(204).send();
            res.json({message:message.msg});
        }
    }

    async getMessagesByTag(req : Request, res : Response) : Promise<void>
    {
        console.log("on GET /messages/"+req.params.tag);
        let retVal = isValidSignature(req.headers.xkey, req.body, req.params, req.headers.xroute, req.headers.xsignature);
        if(!retVal)
            res.status(401).send("Invalid credentials! please try again");
        else
        {
            
            let fetchedMessages = getMessagesByTag(req.params.tag);
            let messageToReturn = "";
            for(let i = 0; i < fetchedMessages.length; i++)
            {
                messageToReturn+=fetchedMessages[i];
                messageToReturn = i+1 == fetchedMessages.length ? messageToReturn : messageToReturn+=", ";
            }
            res.json({message:messageToReturn});
        }
    }
}

export const mainController = new MainController();
