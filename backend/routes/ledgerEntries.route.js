import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAllEntries , postEntry , editEntry ,deleteEntry } from '../controllers/ledgerEntries.controller.js';

const router = express.Router();

router.get('/:id' , isAuthenticated , getAllEntries);
router.post('' , isAuthenticated , postEntry);
router.put('/:id' , isAuthenticated , editEntry);
router.delete('/:id' , isAuthenticated , deleteEntry);


export default router;