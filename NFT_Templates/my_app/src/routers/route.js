import homeRouter from '../routers/home.js';
import walletRouter from '../routers/wallet.js';
import nftMarketPlaceRouter from '../routers/nftmarket.js';

function route(app) {
// Tạm thời comment lại route của homeRouter, có thể dùng khi cần
     app.use('/', homeRouter);

// Sử dụng walletRouter cho tất cả các request có đường dẫn `/`
    app.use('/api', walletRouter)
// Sử dụng nftMarketPlaceRouter cho tất cả các request có đường dẫn `/`
    app.use('/api', nftMarketPlaceRouter)

}
export default route; // Xuất hàm route để sử dụng trong ứng dụng Express chính
