import express from 'express';
const router = express.Router();

import WalletConnectController from '../app/controller/WalletConnectController.js';

router.get('/walletconnect', WalletConnectController.connect);

export default router;
