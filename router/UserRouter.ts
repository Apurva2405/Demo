import { Request, Response, Router } from 'express';
import User from '../models/User';

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }


  public all(req: Request, res: Response): void {
    User.find()
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
        return error;
      });
  }

  public one(req: Request, res: Response): void {
    const { _id } = req.params;
    User.findOne({ _id })
      .then((data) => {
          res.status(200).json({ data });
      })
      .catch((error) => {
       return res.status(500).json({ error });
      });
  }

  public create(req: Request, res: Response): void {
    console.log(req.body);
    var {name,  address,  email, phone, salary } = req.body;
    console.log(name, address,  email,  phone, salary);
    var user = new User({
        name, 
        address,  
        email,  
        phone, 
        salary
    });

    user
      .save()
      .then((data) => {
       res.status(200).json({ data });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
      });
  }

  public update(req: Request, res: Response): void {
    const { _id } = req.params;
    User.findOneAndUpdate({ _id }, req.body)
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const { _id} = req.params;

    User.findOneAndRemove({ _id })
      .then(() => {
        res.status(200).end();
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

 
  public routes() {
    this.router.get('/', this.all);
    this.router.get('/byId/:_id', this.one);
    this.router.post('/', this.create);
    this.router.put('/:_id', this.update);
    this.router.delete('/:_id', this.delete);
  }
}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;
