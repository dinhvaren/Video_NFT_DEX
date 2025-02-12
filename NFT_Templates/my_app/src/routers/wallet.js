import express from 'express';
const router = express.Router();

// Import controller để xử lý logic khi truy cập route
import WalletConnectController from '../app/controller/WalletConnectController.js';

// Định nghĩa route GET "/walletconnect" và gọi phương thức `connect` từ WalletConnectController
router.get('/walletconnect', WalletConnectController.connect);

export default router;
