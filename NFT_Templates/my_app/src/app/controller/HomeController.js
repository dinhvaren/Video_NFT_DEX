// const Course = require('../models/Course');

class HomeController {
    // GET /news
     home(req, res) {
        
        console.log(res.json([
            { id: 1, name: 'Node.js' },
            { id: 2, name: 'React.js' },
            { id: 3, name: 'Python' }
        ]));
    }
    test(req, res) {
        res.send('new details')
    }
}
export default new HomeController();

