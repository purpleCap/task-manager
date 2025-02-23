import { Request, Response, NextFunction } from "express";
import User from "../model/user";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../model/error";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const error = new Error('Validation failed');
            const cerror = new CustomError({statusCode: 422, error, data: errors});
            throw cerror;
        }

        const { email, name, password }  = req.body;
        // const hasUser = await User.findOne({email: email});
        // console.log(hasUser)
        // if(hasUser) {
        //     const error = new Error('Account already exists with this email');
        //     const cerror = new CustomError({statusCode: 409, error, data: null});
        //     throw cerror;
        // }

        const encrypted_pass = await bcrypt.hash(password, 12);
        const user = new User({email, password: encrypted_pass, name});
        const result = await user.save();

        res.status(201).json({
            status: true,
            statusCode: 201,
            message: "Registered successfully",
            userId: result._id
        })
    } catch (err) {
        next(err);
    }
}

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const fetchedUser = await User.findOne({email: email});
        if(!fetchedUser) {
            const error = new Error("No user found with this email");
            const cerror = new CustomError({statusCode: 404, error, data: null});
            throw cerror;
        }
        const isAuthenticated = await bcrypt.compare(password, fetchedUser.password);
        if(isAuthenticated) {
            const token = jwt.sign({
                email: email,
                password: password,
                userId: fetchedUser._id
            }, "areallylongstringaskey", { expiresIn: '1h' });
            
            res.status(200).json({
                status: true,
                statusCode: 200,
                user: fetchedUser,
                token: token
            })
        } else {
            const error = new Error("Wrong credentials!");
             const cerror = new CustomError({statusCode: 401, error, data: null});
            throw cerror;
        }
    } catch (err) {
        next(err);
    }
}

export default { createUser, getUsers };