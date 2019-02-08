
const UserService = require('../services/user');

class UserController {

    static async create(req, res, next) {
        try {
            const user = await UserService.create(req.body);
            res.status(201).send(user);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = UserController;
