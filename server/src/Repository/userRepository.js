const User = require('../../Database/models/UserSchema');
const responseHelper = require('../Helpers/reponseHelper');
const mongoose = require("mongoose");


class UserRepository {
    async findUser(req, res) {
        let { key } = req.query;
        const users = await User.find({
            $and: [
                { is_active: true },
                { _id: { $ne: new mongoose.Types.ObjectId(req.user.id) } },
                {
                    $or: [
                        { email: { $regex: key, $options: "i" } },
                        { first_name: { $regex: key, $options: "i" } },
                        { last_name: { $regex: key, $options: "i" } }
                    ]
                }
            ]
        }).select("-password -password_old -token_email -request_chat -refresh_token -groups -email");
        return responseHelper(res, 200, users)
    };

    async addFriend(req, res) {
        const { id } = req.body;
        if (!id) return responseHelper(res, 400, "user already exists!")
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return responseHelper(res, 400, "Invalid ID format!");
        }
        if (id == req.user.id) return responseHelper(res, 400, "Cannot befriend yourself.");
        let checkUser = await User.findByIdAndUpdate(
            id, { $addToSet: { request_chat: req.user.id } }, { new: true, runValidators: true }
        );
        return responseHelper(res, 200, "add success !");
    };
    async removeFriend(req, res) {
        const { id } = req.body;
        if (!id) return responseHelper(res, 400, "user already exists!")
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return responseHelper(res, 400, "Invalid ID format!");
        }
        let checkUser = await User.findByIdAndUpdate(
            id, { $pull: { request_chat: req.user.id } }, { new: true, runValidators: true }
        );
        return responseHelper(res, 200, "remove success!");
    }

}

module.exports = new UserRepository();