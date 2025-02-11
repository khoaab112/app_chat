const authRepository = require('../Repository/authRepository')
const register = async(req, res) => {
    return authRepository.createUser(req.body, res);
};
const login = async() => {};
const logout = async() => {};
const forgotPassword = async() => {};

module.exports = {
    register,
    login,
    logout,
    forgotPassword
};