
const authenticateMiddleware = require('./middleware/authenticate');

class Routes {
    static configure(app) {
        app.use('/api', authenticateMiddleware(), require('./api'));
    }
}

module.exports = Routes;
