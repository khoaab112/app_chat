const User = require('../../Database/models/UserSchema');

class UserRepository {
    async getAllUsers() {
        return await User.find();
    }

    async getUserById(id) {
        return await User.findById(id);
    }

    async createUser(data) {
        return await User.create(data);
    }
}

module.exports = new UserRepository();