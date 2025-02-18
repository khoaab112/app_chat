//  taoạo phonòng
// theêm nguoươiời vao phongf
// xoa nguoi dung ra khoi phong
const Zoom = require('../../Database/models/ZoomSchema');
const responseHelper = require('../Helpers/reponseHelper');
const mongoose = require("mongoose");


class ZoomRepository {
    async create(req, res) {
        const { name, describe, avartar, users, admin_user, } = req.body;

    }

}