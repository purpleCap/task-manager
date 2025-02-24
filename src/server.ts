import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { PORT, DB_CONNECTION_STRING } from './secrets';
import mongoose from 'mongoose';
import rootRouter from './routes/index.route';
import { ICustomError } from './model/error';

const server = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type,Authorization',
};
server.use(cors(corsOptions));

server.use(express.json());

// server.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next()
// });

server.use('/api', rootRouter);

server.use((error: ICustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || 500;
    const message = error?.error?.message || 'Internal Server Error';
    const data = error.data || null;
    res.status(statusCode).json({ status: false, statusCode: statusCode, message: message, data: data });
});

mongoose.connect(DB_CONNECTION_STRING)
.then(async (_)=> {
//   const hasUser  = await User.findOne();
//   if(!hasUser) {
//     const user = new User({name: "pratik", email: "pratik@example.com", password: "Pass@123"})
//     await user.save()
//   }
  console.log("connected to DB")
  server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
})
.catch(err => {
  console.log(err);
});

export default server;
