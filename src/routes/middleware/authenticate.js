const {AUTH_SECRET} = process.env;
const {split} = require('lodash');

module.exports = () => (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        return res.status(401).send({error: 'Missing Authorization header'});
    }
    const token = split(header, /\s+/).pop();
    if (!token) {
        return res.status(401).send({error: 'Missing Bearer token'});
    }
    if (token !== AUTH_SECRET) {
        return res.status(401).send({error: 'Invalid Bearer token'});
    }
    next();
};
