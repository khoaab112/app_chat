const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_ACCECSS, JWT_SECRET_REFRESH, ALGORITHM_JWT, EXPIRES_ACCECSS_TOKEN, EXPIRES_REFRESH_TOKEN } = process.env;
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

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) return responseHelper(res, 403, "Invalid information!");

        const generateTokens = (user) => ({
            access_token: jwt.sign({
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    phone_number: user.phone_number
                },
                JWT_SECRET_ACCECSS, { algorithm: ALGORITHM_JWT, expiresIn: EXPIRES_ACCECSS_TOKEN }
            ),
            refresh_token: jwt.sign({ id: user.id, email: user.email },
                JWT_SECRET_REFRESH, { algorithm: ALGORITHM_JWT, expiresIn: EXPIRES_REFRESH_TOKEN }
            )
        });
        const tokens = generateTokens(user);
        await User.findOneAndUpdate({ email }, { refresh_token: tokens.refresh_token });
        return responseHelper(res, 200, tokens);
    };
}

module.exports = new UserRepository();