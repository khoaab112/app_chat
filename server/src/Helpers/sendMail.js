const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
const pathTemplateHTML = "../../storage/template/mail/"

const {
    MAIL_USERNAME,
    MAIL_PASSWORD,
    APP_NAME,
    URL_SERVER,
    NODE_ENV,
    PORT_SERVER
} = process.env;
const {
    FILE_HTML_AUTHENTICATION_CODE,
    FILE_HTML_RESET_PASSWORD
} = require('../../config/globalVar')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
    },
});

const send = async() => {
    const emailTemplatePath = path.join(__dirname, pathTemplateHTML, FILE_HTML_AUTHENTICATION_CODE);
    const emailHTML = fs.readFileSync(emailTemplatePath, 'utf-8');
    const data = {
        APP_NAME: "Nguyễn Văn A",
        content: "Bạn đã nhận được email từ hệ thống."
    };
    const renderedHTML = mustache.render(emailHTML, data);
    const mailOptions = {
        from: MAIL_USERNAME,
        to: "khoa3qqq@gmail.com",
        subject: "Đáp ứng yêu cầu",
        text: "Hello, this is a 3 email from Node.js!",
        html: renderedHTML
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error;
        } else {
            return info;
        }
    });
}
const mailConfirm = async(data) => {
    const emailTemplatePath = path.join(__dirname, pathTemplateHTML, FILE_HTML_AUTHENTICATION_CODE);
    const emailHTML = fs.readFileSync(emailTemplatePath, 'utf-8');
    let { last_name, first_name, email, token } = data;
    let domain = NODE_ENV == 'development' ? `${URL_SERVER}:${PORT_SERVER}` : URL_SERVER;
    let path_confirm = domain + "/api/auth/confirm/" + token;
    let path_block = domain + "/api/auth/block/" + token;
    const obj = {
        APP_NAME,
        last_name,
        first_name,
        email,
        token,
        path_confirm,
        path_block
    };
    const renderedHTML = mustache.render(emailHTML, obj);
    const mailOptions = {
        from: MAIL_USERNAME,
        to: email,
        subject: "Xác nhận tài khoản",
        html: renderedHTML
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error;
        } else {
            return info;
        }
    });
};
const mailResetPassword = async(data) => {
    const emailTemplatePath = path.join(__dirname, pathTemplateHTML, FILE_HTML_RESET_PASSWORD);
    const emailHTML = fs.readFileSync(emailTemplatePath, 'utf-8');
    let { token, email } = data;
    let domain = NODE_ENV == 'development' ? `${URL_SERVER}:${PORT_SERVER}` : URL_SERVER;
    let path_reset = domain + "/api/auth/reset/" + token;
    let path_block = domain + "/api/auth/block/" + token;
    const obj = {
        token,
        path_reset,
        path_block
    };
    const renderedHTML = mustache.render(emailHTML, obj);
    const mailOptions = {
        from: MAIL_USERNAME,
        to: email,
        subject: "Thay đổi mật khẩu",
        html: renderedHTML
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error;
        } else {
            return info;
        }
    });
}

module.exports = {
    send,
    mailConfirm,
    mailResetPassword
};