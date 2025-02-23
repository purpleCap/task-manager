import { Request, Response, NextFunction } from "express";
import Task from "../model/task";
import User from "../model/user";
import { validationResult } from "express-validator";
import CustomError from "../model/error";

const createTask = async (req: any, res: Response, next: NextFunction) => {
     try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
          const error = new Error('Validation failed, entered data is incorrect');
          const cerror = new CustomError({statusCode: 422, error, data: errors});
          throw cerror;
          // return res.status(422).json({message: 'Validation failed, entered data is incorrect', errors: errors.array()})
        }
        
    
        const user = await User.findById(req.userId);
        if(!user) {
          const error = new Error("No user found");
          const cerror = new CustomError({statusCode: 404, error, data: null});
          throw cerror;
        }
        const { title, description } = req.body;
        const postContent = {
          title: title,
          description: description,
          creator: req.userId
        };
     
        const newTask = new Task(postContent);
        const result = await newTask.save();

        if(user.tasks)
          user.tasks.push(result._id);
        else {
          user.tasks = [result._id];
        }
        await user.save();
        res.status(201).json({
          status: true,
          message: "Task created successfully",
          task: result,
        });
        } catch (err) {
            next(err);
        }
}

const getTask = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.userId).populate('tasks', "-creator -__v")
        .sort({createdAt: -1});
        if(!user) {
          const error = new Error("No user found");
          const cerror = new CustomError({statusCode: 404, error, data: null});
          throw cerror;
        }
        res.status(201).json({
            status: true,
            message: "Task fetched successfully",
            task: user.tasks,
          });
    } catch (err) {
        next(err);
    }
}

const getTaskById = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.userId).populate('tasks', "-creator -__v")
        .sort({createdAt: -1});
        if(!user) {
          const error = new Error("No user found");
          const cerror = new CustomError({statusCode: 404, error, data: null});
          throw cerror;
        }
        const {id} = req.params;
        const findIndexOf = user.tasks.findIndex(t => String(t._id) === id);
        if(findIndexOf === -1) {
          const error = new Error("You are not authorized to access this task");
          const cerror = new CustomError({statusCode: 403, error, data: null});
          throw cerror;
        }
        const task = await Task.findById(id);
        res.status(201).json({
          status: true,
          message: "Task fetched successfully",
          task: task,
        });
    } catch (err) {
        next(err);
    }
}

const editTask = async (req: any, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
          const error = new Error('Validation failed, entered data is incorrect');
          const cerror = new CustomError({statusCode: 422, error, data: errors});
          throw cerror;
        }
        const user = await User.findById(req.userId).populate('tasks', "-creator -__v");
        if(!user) {
          const error = new Error("No user found");
          const cerror = new CustomError({statusCode: 404, error, data: null});
          throw cerror;
        }
        const { title, description }  = req.body;
        const {id}  = req.params;
        const findIndexOf = user.tasks.findIndex(t => String(t._id) === id);
        if(findIndexOf === -1) {
          const error = new Error("You are not authorized to access this task");
          const cerror = new CustomError({statusCode: 403, error, data: null});
          throw cerror;
        }

        const task = await Task.findById(id)
        task!.title = title;
        task!.description = description;
        const result = await task?.save();

        res.status(200).json({
            status: true,
            message: "Task updated successfully",
            task: result
          });
    } catch (err) {
        next(err);
    }
}

const deleteTask = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.userId).populate('tasks', "-creator -__v");
        if(!user) {
          const error = new Error("No user found");
          const cerror = new CustomError({statusCode: 404, error, data: null});
          throw cerror;
        }
        const { id }  = req.params;
        const findIndexOf = user.tasks.findIndex(t => String(t._id) === id);
        if(findIndexOf === -1) {
          const error = new Error("You are not authorized to access this task");
          const cerror = new CustomError({statusCode: 403, error, data: null});
          throw cerror;
        }

        const task = await Task.findById(id)
        await task?.deleteOne();

        res.status(200).json({
            status: true,
            message: "Task deleted",
            task: task
          });
        
    } catch (err) {
        next(err);
    }
}

export default { createTask, getTask, getTaskById, editTask, deleteTask };