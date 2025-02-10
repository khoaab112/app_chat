const User = require('../../Database/models/UserSchema');

class UserRepository {
    async createUser(data) {
        return await User.create(data);
    }
}

module.exports = new UserRepository();