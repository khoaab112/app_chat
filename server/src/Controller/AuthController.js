const authRepository = require('../Repository/authRepository')
const register = async(req, res) => {
    return authRepository.createUser(req.body, res);
};
const login = async(req, res) => {
    return authRepository.login(req.body, res);
};
const logout = async(req, res) => {
    return authRepository.logout(req, res);
};
const forgotPassword = async() => {};

module.exports = {
    register,
    login,
    logout,
    forgotPassword
};