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
        if (!id) return responseHelper(res, 400, "user already exists!");
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return responseHelper(res, 400, "Invalid ID format!");
        }
        let checkUser = await User.findByIdAndUpdate(
            id, { $pull: { request_chat: req.user.id } }, { new: true, runValidators: true }
        );
        return responseHelper(res, 200, "remove success!");
    };
    //  confirm friend
    async confirmFriend(req, res) {
        const { id } = req.body;
        const user = req.user;
        if (!id) return responseHelper(res, 400, "User ID is required!");
        if (id == user.id) return responseHelper(res, 400, "Cannot befriend yourself.");
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return responseHelper(res, 400, "Invalid ID format!");
        };
        const userConfirm = await User.findById(id).exec();
        if (!userConfirm) return responseHelper(res, 404, "User not found!");
        let main = await User.findById(user.id).exec();
        if (!main) return responseHelper(res, 404, "Current user not found!");
        if (!main.request_chat.includes(id)) return responseHelper(res, 400, "Not in the friends list!");
        const updatedUser = await User.findByIdAndUpdate(
            user.id, {
                $pull: { request_chat: id },
                $addToSet: { friends: id },
            }, { new: true, runValidators: true }
        );
        if (!updatedUser) return responseHelper(res, 500, "Failed to add friend!");
        return responseHelper(res, 200, "Friend added successfully");
    }

}

module.exports = new UserRepository();