import express from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';
import path from 'path';
import next from 'next';
import { fileURLToPath } from 'url';

const app = express();
const port = 3009;

const dev = process.env.NODE_ENV !== "production"; // Kiểm tra môi trường
const nextApp = next({ dev }); // Khởi tạo Next.js
const handle = nextApp.getRequestHandler(); // Xử lý request Next.js

// Xử lý __dirname vì ES Modules không có sẵn
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import route from '../src/routers/route.js';
// const db = require('./config/db');

// connect to db
// db.connect();
// HTTP logger
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'my_app')));

app.use(methodOverride('_method'))

nextApp.prepare().then(() => {
    // Sử dụng route API riêng (Express)
    route(app);
  
    // Bất kỳ route nào không khớp với Express API -> Next.js xử lý
    app.all("*", (req, res) => {
      return handle(req, res);
    });
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
