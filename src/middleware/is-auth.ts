import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../model/error';

export default async (req : any, res : Response, next: NextFunction) => {
    try {
        let token = "";
        if(!req.get('Authorization')){
            const error = new Error("You are not authorized");
            const cerror = new CustomError({statusCode: 403, error, data: []});
            throw cerror;
        }
        token = req.get('Authorization')!.split(' ')[1];
        const data : any = jwt.verify(token, 'areallylongstringaskey');
        if(!data) {
            const error = new Error("Not authenticated");
            const cerror = new CustomError({statusCode: 401, error, data: []});
            throw cerror;
        }
        req.userId = data.userId;
        next()
    } catch(err : any) {
        if(!err.statusCode)
            err.statusCode = 500;
        next(err)
    }
}

