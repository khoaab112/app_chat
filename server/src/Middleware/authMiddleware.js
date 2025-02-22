const jwt = require('jsonwebtoken');
const responseHelper = require('../Helpers/reponseHelper');
const authRepository = require('../Repository/authRepository')
const { getRedis } = require('../Helpers/redisHelper')

const { key_cookie_refresh_token, blacklist_token } = require('../../config/globalVar')
const { JWT_SECRET_ACCECSS, JWT_SECRET_REFRESH } = process.env;

const checkToken = (token, secret) => {
    return new Promise((resolve) => {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    return resolve({
                        status: '-1',
                        msg: err.message
                    });
                } else {
                    return resolve({
                        status: '-2',
                        msg: err.message
                    });
                }
            }
            let now = Math.floor(Date.now() / 1000);
            let timeLeft = decoded.exp - now;
            return resolve({
                status: '01',
                msg: decoded,
                reissue: timeLeft <= 7200 ? true : false // nhoỏ hon 2h thi cap lai token
            });
        });
    });
};


exports.verifyToken = async(req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return responseHelper(res, 401, "");
    }
    token = token.split(" ")[1];
    let resultCheckAccess = await checkToken(token, JWT_SECRET_ACCECSS);
    if (resultCheckAccess.status == '-1') return responseHelper(res, 403, resultCheckAccess.msg);
    if (resultCheckAccess.status == '-2') {
        let refreshToken = req.cookies[key_cookie_refresh_token];
        let resultCheckRefresh = await checkToken(refreshToken, JWT_SECRET_REFRESH);
        if (resultCheckRefresh.status !== '01') return responseHelper(res, 403, resultCheckRefresh.msg);
        let result = await authRepository.refreshAccessToken(resultCheckRefresh.msg.id, refreshToken, resultCheckRefresh.reissue);
        if (!result) return responseHelper(res, 403, result);
        return responseHelper(res, 401, "reissue token", { access_token: result });
    }
    req.user = resultCheckAccess.msg;
    let isBlackList = (await getRedis(blacklist_token + resultCheckAccess.msg.id)).value;
    if (isBlackList) return responseHelper(res, 403, "Unauthorized key !");
    req.token = token;
    return next();
};