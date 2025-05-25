import express from 'express';
import { registerUser , loginUser , logoutUser , getLoggedInUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register' , registerUser);
router.post('/login' , loginUser);
router.get('/logout' , logoutUser);
router.get('/me' , getLoggedInUser);


export default router;