import express, {Application} from 'express';
import { mainRoutes} from './mainRoutes';


class ApiServer
{
    readonly PORT = 3000;
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
        this.app.use('/api/', mainRoutes );
    }

    start()
    {
        this.app.listen(this.PORT, () =>{
            console.log("ApiServer listening on port "+this.PORT);
        });
    }
}

var serverInstance = new ApiServer();
serverInstance.start();