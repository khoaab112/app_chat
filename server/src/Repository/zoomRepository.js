//  taoạo phonòng
// theêm nguoươiời vao phongf
// xoa nguoi dung ra khoi phong
const Zoom = require('../../Database/models/ZoomSchema');
const User = require('../../Database/models/UserSchema');
const responseHelper = require('../Helpers/reponseHelper');
const mongoose = require("mongoose");


class ZoomRepository {
    async createGroup(req, res) {
        let { name, describe, avartar, users } = req.body;
        const main = req.user;
        users = JSON.parse(users);
        if (!Array.isArray(users))
            return responseHelper(res, 400, "Invalid format user.!");
        let arrUser = users.slice(0, 2).map(item => ({ _id: item }));
        const foundDocuments = await User.find({
            $and: [
                { $or: arrUser, },
                { _id: { $ne: new mongoose.Types.ObjectId(main.id) } },
                { is_active: true },
            ]
        }).lean();
        if (foundDocuments.length === 0)
            return responseHelper(res, 400, "User does not exist.!");
        const notExist = arrUser.filter(condition =>
            !foundDocuments.some(doc => doc._id.toString() === condition._id.toString())
        );
        if (notExist.length > 0)
            return responseHelper(res, 400, "User does not exist.!");
        let zoom = {
            name,
            describe,
            users,
            admin_user: {
                id: main.id,
                first_name: main.first_name,
                last_name: main.last_name,
            },
            creator: {
                id: main.id,
                first_name: main.first_name,
                last_name: main.last_name,
            },
            is_active: true,
            is_group: true,
        };
        await Zoom.create(zoom).then(result => {
                return responseHelper(res, 200, "success")
            })
            .catch(err => {
                console.log(err);
                return responseHelper(res, 400, err.message)
            });
    }
    async createZoom(req, res) {
        let { users } = req.body;
        const main = req.user;
        let name = "null";
        let describe = "null";
        let avartar = "null";
        users = JSON.parse(users);
        if (!Array.isArray(users))
            return responseHelper(res, 400, "Invalid format user.!");
        let arrUser = users.slice(0, 2).map(item => ({ _id: item }));
        const foundDocuments = await User.find({
            $and: [
                { $or: arrUser, },
                { _id: { $ne: new mongoose.Types.ObjectId(main.id) } },
                { is_active: true },
            ]
        }).lean();
        if (foundDocuments.length === 0)
            return responseHelper(res, 400, "User does not exist.!");
        const notExist = arrUser.filter(condition =>
            !foundDocuments.some(doc => doc._id.toString() === condition._id.toString())
        );
        if (notExist.length > 0)
            return responseHelper(res, 400, "User does not exist.!");
        let zoom = {
            name,
            describe,
            users,
            creator: {
                id: main.id,
                first_name: main.first_name,
                last_name: main.last_name,
            },
            is_active: true,
            is_group: false,
        };
        await Zoom.create(zoom).then(result => {
                return responseHelper(res, 200, "success")
            })
            .catch(err => {
                console.log(err);
                return responseHelper(res, 400, err.message)
            });
    };
    addMembers = async(req, res) => {
        let { users, group_id } = req.body;
        users = JSON.parse(users);
        if (!Array.isArray(users))
            return responseHelper(res, 400, "Invalid format user.!");
        let checkGroup = await User.findById(group_id).exec();
        let arrUser = users.slice(0, 2).map(item => ({ _id: item }));
    }

}

module.exports = new ZoomRepository();