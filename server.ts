import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as path from "path";
// import * as compression from "compression";

//import PostRouter from "./router/PostRouter";
import UserRouter from "./router/UserRouter";

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.use('/', express.static(__dirname + '/public'));
    }

  
    public config() {
        const MONGO_URI = 'mongodb://localhost:27017/demo1';
        mongoose.connect(MONGO_URI);
        console.log("connected to mongodb");
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();
        this.app.use('/', router);
        //this.app.use('/api/v1/posts', PostRouter);
        this.app.use('/api/v1/users', UserRouter);
    }
}

export default new Server().app;