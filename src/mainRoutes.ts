import {Router} from 'express';
import {mainController} from './mainController';
class mainRoutes
{

    public router : Router;

    constructor()
    {
        this.router = Router();
        this.setRoutes();
    }

    setRoutes()
    {
        this.router.put('/credential', mainController.putCredential);
        this.router.post('/message', mainController.postMessage);
        this.router.get('/message/:id', mainController.getMessageByID);
        this.router.get('/messages/:tag', mainController.getMessagesByTag);
    }

}