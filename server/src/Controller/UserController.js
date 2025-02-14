const userRepository = require('../Repository/userRepository')


const findUserByMailOrKey = async(req, res) => {
    return userRepository.findUser(req, res);
};

const addFriend = async(req, res) => {
    return userRepository.addFriend(req, res);
}
const removeFriend = async(req, res) => {
    return userRepository.removeFriend(req, res);
}
module.exports = {
    findUserByMailOrKey,
    addFriend,
    removeFriend
}