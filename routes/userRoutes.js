import { Router } from 'express';
import UserController from '../controllers/userController.js';
import isLoggedIn from '../middleware/authentication.js';

const router = Router();

// GET
router.get('/dashboard', isLoggedIn,  UserController.dashboard);
router.get('/dashboard/note/:id', isLoggedIn, UserController.getNote);
router.get('/dashboard/new-note', isLoggedIn, UserController.newNotePage);

// DELETE
router.delete('/dashboard/note/:id', isLoggedIn, UserController.deleteNote);

// PUT
router.put('/dashboard/note/:id', isLoggedIn, UserController.updateNote);

// POST
router.post('/dashboard/note/add-note', isLoggedIn, UserController.addNote);

export default router;
