import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getLedgerAccountData , getLedgerAccounts , postLedgerAccount , putLedgerAccount , deleteLedgerAccount } from '../controllers/ledgerAccount.controller.js';


const router = express.Router();

router.get('' , isAuthenticated , getLedgerAccounts);
router.get('/:id' , isAuthenticated , getLedgerAccountData);
router.post('' , isAuthenticated , postLedgerAccount);
router.put('/:id' , isAuthenticated , putLedgerAccount);
router.delete('/:id' , isAuthenticated , deleteLedgerAccount);

export default router;