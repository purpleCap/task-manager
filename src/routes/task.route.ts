import express, { Router } from 'express';
import taskController from './../controllers/task.controller'
import { body } from 'express-validator';
const router: Router = express.Router();

router.get('/', taskController.getTask);

router.get('/:id', taskController.getTaskById);

router.post('/create', [
    body('title')
      .trim()
      .not()
      .isEmpty()
      .withMessage("Title cannot be empty")
  ], taskController.createTask);

router.put('/:id', [
    body('title')
      .trim()
      .not()
      .isEmpty()
      .withMessage("Title cannot be empty")
  ], taskController.editTask);

router.delete('/:id', taskController.deleteTask);

export default router;