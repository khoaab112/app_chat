const User = require('../../Database/models/UserSchema');
const responseHelper = require('../Helpers/reponseHelper');

class UserRepository {
    async createUser(data, res) {

        // const result = new User(data);
        // // let error = result.validateSync();
        const result = await User.create(data).then(result => {
                return responseHelper(res, 200, result)
            })
            .catch(err => {
                return responseHelper(res, 400, err.message)
            });
    }
}

module.exports = new UserRepository();