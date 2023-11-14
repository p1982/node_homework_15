import express from 'express';
import formidable from 'express-formidable';
import session from "express-session";
import errorHandle from './utils/errorHandle.ts';
import { logRequest } from './utils/logger.ts';

const fieldsToBody = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  
  
  if (req['fields']) {
    req.body = req['fields'];
  }
  next();
};

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers:Array<any>, port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.setupRoutes(controllers);
    this.initializeErrorHandle();
  }

  private initializeMiddlewares() {
    this.app.use(express.static('public'));
    this.app.use(
      session({
        secret: "secret",
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.use(formidable());
    this.app.use(fieldsToBody);
    this.app.use(logRequest);
  }

  private initializeErrorHandle() {
    this.app.use(errorHandle);
  }

  private setupRoutes(controllers:Array<any>) { 
    this.app.get('/', (req, res) => {
      res.send('Hello, World!');
    });

    controllers.forEach(controller=>{
      this.app.use(`/api${controller.path}`, controller.router);
    })    
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}



export default App;
