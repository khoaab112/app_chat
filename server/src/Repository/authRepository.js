const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { setRedisForType, getRedis } = require('./../Helpers/redisHelper');

const {
    blacklist_token,
    expires_access_token_second,
    expores_cookie_token,
    key_cookie_refresh_token,
    EXPIRES_ACCECSS_TOKEN,
    EXPIRES_REFRESH_TOKEN,
    key_redis_send_mail,
    time_mail
} = require('./../../config/globalVar');

const {
    JWT_SECRET_ACCECSS,
    JWT_SECRET_REFRESH,
    ALGORITHM_JWT,
    JWT_SECRET_MAIL,
} = process.env;

const User = require('../../Database/models/UserSchema');
const UserPendingSchema = require('../../Database/models/UserPendingSchema');
const responseHelper = require('../Helpers/reponseHelper');
const { mailConfirm, mailResetPassword } = require('../Helpers/sendMail')

class UserRepository {
    async register(data, res) {
        let email = data.email;
        const { password } = data;
        let checkUser = await User.findOne({ email }).exec();
        if (checkUser) return responseHelper(res, 400, "email already exists!")
        let hash = await argon2.hash(password);
        let token = jwt.sign({ email: data.email },
            JWT_SECRET_MAIL, { algorithm: ALGORITHM_JWT, expiresIn: EXPIRES_REFRESH_TOKEN }
        );
        data.password = hash;
        data.token = token;
        await UserPendingSchema.create(data).then(async result => {
                await mailConfirm(data)
                return responseHelper(res, 200, "success ! check email")
            })
            .catch(err => {
                return responseHelper(res, 400, err.message)
            });
    };
    async createUser(data, res) {
        const token = data.token;
        let user = await UserPendingSchema.findOneAndDelete({ token }).exec();
        if (!user)
            return responseHelper(res, 400, "Invalid token.")
        const userObject = user.toObject();
        delete userObject._id;
        delete userObject.token;
        await User.create(userObject).then(result => {
                return res.redirect(301, 'https://www.google.com.vn/?hl=vi');
                return responseHelper(res, 200, "success")
            })
            .catch(err => {
                return responseHelper(res, 400, err.message)
            });
    }
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
    async forgotPassword(data, res) {
        let email = data.email;
        let checkSpam = await getRedis(key_redis_send_mail + email, true);
        if (checkSpam.value) {
            return responseHelper(res, 400, `Please check your email. The next send will be available in ${Math.round(checkSpam.ttl / 60)} minutes.`)
        }
        let token = jwt.sign({ email },
            JWT_SECRET_MAIL, { algorithm: ALGORITHM_JWT, expiresIn: EXPIRES_ACCECSS_TOKEN }
        );
        token = { token_email: token };
        let checkUser = await User.findOneAndUpdate({ email }, token).exec();
        if (!checkUser) return responseHelper(res, 403, "email does not exist!");
        data.token = token.token_email;
        data.email = email;
        await mailResetPassword(data);
        await setRedisForType(key_redis_send_mail + email, token, 'string', time_mail);
        return responseHelper(res, 200, "success ! check email")
    }
}

module.exports = new UserRepository();