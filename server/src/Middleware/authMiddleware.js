const jwt = require('jsonwebtoken');
const responseHelper = require('../Helpers/reponseHelper');
const { JWT_SECRET_ACCECSS, JWT_SECRET_REFRESH, ALGORITHM_JWT, EXPIRES_ACCECSS_TOKEN, EXPIRES_REFRESH_TOKEN } = process.env;

exports.verifyToken = (req, res, next) => {
    console.log(req.cookies);
    let token = req.headers.authorization;
    if (!token) {
        return responseHelper(res, 401, "");
    }
    token = token.split(" ")[1];
    jwt.verify(token, JWT_SECRET_ACCECSS, function(err, decoded) {
        if (err) {
            if (err.name = 'JsonWebTokenError')
                return responseHelper(res, 403, err.message);
            else {
                const user = jwt.decode(token, { complete: true });

            }

        }
        req.user = decoded;
        return next();
    });
};