const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { setRedisForType } = require('./../Helpers/redisHelper');

const {
    blacklist_token,
    expires_access_token_second,
    expores_cookie_token,
    key_cookie_refresh_token,
    EXPIRES_ACCECSS_TOKEN,
    EXPIRES_REFRESH_TOKEN,
} = require('./../../config/globalVar');

const {
    JWT_SECRET_ACCECSS,
    JWT_SECRET_REFRESH,
    ALGORITHM_JWT,
} = process.env;

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
        if (!user.is_active) return responseHelper(res, 403, "Account disabled !");
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
        res.cookie(key_cookie_refresh_token, tokens.refresh_token, { httpOnly: true, maxAge: expores_cookie_token });
        await User.findOneAndUpdate({ email }, { refresh_token: tokens.refresh_token });
        return responseHelper(res, 200, tokens);
    };
    async refreshAccessToken(userID, refreshToken, reissue) {
        let user = await User.findById(userID).exec();
        if (user.refresh_token === refreshToken) {
            let payload = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.phone_number
            };
            let accessToken = jwt.sign(payload,
                JWT_SECRET_ACCECSS, { algorithm: ALGORITHM_JWT, expiresIn: EXPIRES_ACCECSS_TOKEN }
            );
            if (reissue) {
                let refresh_token = jwt.sign({ id: user.id, email: user.email },
                    JWT_SECRET_REFRESH, { algorithm: ALGORITHM_JWT, expiresIn: EXPIRES_REFRESH_TOKEN }
                )
                res.cookie(key_cookie_refresh_token, refresh_token, { httpOnly: true, maxAge: expores_cookie_token });
            }
            return accessToken;
        }
        return null;
    };
    async logout(req, res) {
        let user = req.user;
        if (!user) return responseHelper(res, 404, "");
        let removeToken = await User.findOneAndUpdate({ _id: user.id }, { refresh_token: "" });
        if (!removeToken) return responseHelper(res, 403, "");
        console.log(expires_access_token_second)
        await setRedisForType(blacklist_token + user.id, req.token, 'string', expires_access_token_second);
        return responseHelper(res, 200, "Logout completed !");
    }

}

module.exports = new UserRepository();