import express from 'express';
import { registerUser, getAllUsers, deleteUserByUsername } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/all', getAllUsers);
router.post('/delete', deleteUserByUsername);

export default router;