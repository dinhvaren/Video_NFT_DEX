import express from 'express'; // Import thư viện Express để tạo router
const router = express.Router(); // Khởi tạo một router mới từ Express

import HomeController from '../app/controller/HomeController.js'; // Import HomeController để xử lý các route

// Định nghĩa route GET `/my-profile`, gọi phương thức `home` từ HomeController
router.get('/my-profile', HomeController.home);
// Định nghĩa route GET `/`, gọi phương thức `test` từ HomeController
router.get('/', HomeController.test);

export default router;
