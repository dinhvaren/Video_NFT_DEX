// const Course = require('../models/Course');

class NFTMarketPlaceController {
    // GET /news
    createToken(req, res) {
        res.json([
            { id: 1, name: 'Bitcoin' },
            { id: 2, name: 'Etherum' },
            { id: 3, name: 'Solana' }
        ]);
    }
    details(req, res, next) {
        res.send('<H1>New Request</H1>')
    }
}
export default new NFTMarketPlaceController();

