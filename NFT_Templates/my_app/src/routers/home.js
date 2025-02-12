import express from 'express';
const router = express.Router();

import HomeController from '../app/controller/HomeController.js';

router.get('/my-profile', HomeController.home);
router.get('/', HomeController.test);

export default router;
