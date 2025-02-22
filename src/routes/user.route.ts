import express, { Router } from 'express';
import userController from './../controllers/user.controller'
const router: Router = express.Router();

// router.get('/', userController.getUsers);
router.post('/signup', userController.createUser);
router.post('/login', userController.getUsers);

export default router;