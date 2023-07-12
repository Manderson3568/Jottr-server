import express from 'express';
import * as usersController from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.post('/login', usersController.loginUser);
usersRouter.post('/signup', usersController.signupUser);


export default usersRouter;