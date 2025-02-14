import express from 'express';
const router = express.Router();

// Import controller để xử lý logic khi truy cập route
import NFTMarketPlaceController from '../app/controller/NFTMarketPlaceController.js';

// Định nghĩa route GET "/createToken" và gọi phương thức `createToken` từ NFTMarketPlaceController
router.post('/uploadNFT', NFTMarketPlaceController.createToken);
router.get('/NFT-details', NFTMarketPlaceController.details);

export default router;