const User = require('../../Database/models/UserSchema');
const responseHelper = require('../Helpers/reponseHelper');

class UserRepository {
    async createUser(data, res) {
        const result = await User.create(data);
        console.log(result);
        return responseHelper(res, 200, "lỗi")
    }
}

module.exports = new UserRepository();