import express, {Application} from 'express';


class ApiServer
{
    public app : Application;
    constructor()
    {
        this.app = express();
        this.config();
    }

    config()
    {
        this.app.set('port', 3000);
        this.app.use(express.urlencoded({extended : false}));
        this.app.use(express.json());
    }
}