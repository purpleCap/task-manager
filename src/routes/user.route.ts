import express, { Router } from 'express';
import userController from './../controllers/user.controller'
import { body } from 'express-validator';
import User from '../model/user';
const router: Router = express.Router();

// router.get('/', userController.getUsers);
router.post('/signup',  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value, {req}) => {
          const fetchedUser = await User.findOne({email: value});
          if(fetchedUser) {
              return Promise.reject("Account already exists with this email");
          }
      })
      .normalizeEmail(),
    body("password")
      .trim().isLength({min: 5}),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ], userController.createUser);

router.post('/reset',  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value, {req}) => {
          const fetchedUser = await User.findOne({email: value});
          if(!fetchedUser) {
              return Promise.reject("No user found with this email");
          }
      })
      .normalizeEmail(),
    body("password")
      .trim().isLength({min: 5})
  ], userController.reset);

  
router.post('/login', userController.login);

export default router;