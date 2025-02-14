import express from 'express'; // Import Express để tạo server
import morgan from 'morgan'; // Import Morgan để log request HTTP
import methodOverride from 'method-override'; // Cho phép sử dụng HTTP methods như PUT, DELETE trong form HTML
import path from 'path'; // Thư viện làm việc với đường dẫn file
import next from 'next'; // Import Next.js để kết hợp với Express
import { fileURLToPath } from 'url'; // Giúp xử lý đường dẫn file trong ES Modules
import route from '../src/routers/route.js';
import db from './config/index.js'; // import db từ config để kết nối với mongodb

// Khởi tạo ứng dụng Express
const app = express();
// Cổng mà server sẽ chạy
const port = 3009;

const dev = process.env.NODE_ENV !== "production"; // Kiểm tra môi trường
const nextApp = next({ dev }); // Khởi tạo Next.js
const handle = nextApp.getRequestHandler(); // Xử lý request Next.js

// Xử lý __dirname vì ES Modules không có sẵn
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Kết nối database
db.connect();
// Ghi log tất cả request đến server
app.use(morgan('combined'));
// Middleware để xử lý dữ liệu JSON từ request body
app.use(express.json());
// Cấu hình thư mục static (NFT_Temlates)
app.use(express.static(path.join(__dirname, 'my_app')));
 // Hỗ trợ override method HTTP (cần thiết cho PUT/DELETE)
app.use(methodOverride('_method'))
// Chuẩn bị Next.js và khởi chạy server
nextApp.prepare().then(() => {
    // Sử dụng route API riêng (Express)
    route(app); // Kích hoạt các route của Express
    // Bất kỳ route nào không khớp với Express API -> Next.js xử lý
    app.all("*", (req, res) => {
      return handle(req, res); // Chuyển các request không thuộc Express cho Next.js xử lý
    });
    // Lắng nghe server tại cổng 3009
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`); // Log thông báo server đã chạy
    });
})
