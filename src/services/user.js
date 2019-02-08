
const User = require('../models/user');

class UserService {

    static async create(user) {
        return User.create(user);
    }

}

module.exports = UserService;
