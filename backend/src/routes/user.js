import express from 'express';
//! imp controllers
import * as userController from '../controllers/user.js';

const router = express.Router();

//! @desc     Create a new User [Register]
//! @route    POST /users/signup
//! @access   Public
router.post('/signup', userController.signup);

//! @desc     [Authentication]
//! @route    POST /users/signin
//! @access   Public
router.post('/signin', userController.signin);


export default router;
