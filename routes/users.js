import express from 'express';
import * as usersController from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.post('/login', usersController.loginUser);
// router.get('/', usersController.getusers);
// router.get('/:id', usersController.getNoteById);
// router.put('/:id', usersController.updateNote);
// router.delete('/:id', usersController.deleteNote);

export default usersRouter;