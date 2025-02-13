const authRepository = require('../Repository/authRepository')
const register = async(req, res) => {
    return authRepository.register(req.body, res);
};
const confirmAccount = async(req, res) => {
    return authRepository.createUser(req.params, res);
}
const login = async(req, res) => {
    return authRepository.login(req.body, res);
};
const logout = async(req, res) => {
    return authRepository.logout(req, res);
};
const forgotPassword = async() => {};

module.exports = {
    register,
    confirmAccount,
    login,
    logout,
    forgotPassword
};