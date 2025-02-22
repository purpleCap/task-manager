import express, { Router } from 'express';
import taskController from './../controllers/task.controller'
const router: Router = express.Router();

router.get('/', taskController.getTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.editTask);
router.delete('/:id', taskController.deleteTask);

export default router;