
class Routes {
    static configure(app) {
        app.use('/api', require('./api'));
    }
}

module.exports = Routes;
