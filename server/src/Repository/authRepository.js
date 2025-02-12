const argon2 = require('argon2');
const User = require('../../Database/models/UserSchema');
const responseHelper = require('../Helpers/reponseHelper');

class UserRepository {
    async createUser(data, res) {
        const { password } = data;
        let hash;
        try {
            hash = await argon2.hash(password);
        } catch (err) {
            return responseHelper(res, 500, err)
        }
        data.password = hash;
        await User.create(data).then(result => {
                return responseHelper(res, 200, "success")
            })
            .catch(err => {
                return responseHelper(res, 400, err.message)
            });
    };
    async login(data, res) {
        const { email, password } = data;
        let user = await User.findOne({ email }).exec();
        if (!user) return responseHelper(res, 403, "Invalid information !");
        try {
            if (await argon2.verify(user.password, password)) {
                // true
            } else {
                return responseHelper(res, 403, "Invalid information !");
            }
        } catch (err) {
            return responseHelper(res, 500, err)
        }
    };
}

module.exports = new UserRepository();