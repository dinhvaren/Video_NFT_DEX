import homeRouter from '../routers/home.js';
import walletRouter from '../routers/wallet.js';

function route(app) {
    // app.use('/', homeRouter);
    app.use('/', walletRouter)
}
export default route;
