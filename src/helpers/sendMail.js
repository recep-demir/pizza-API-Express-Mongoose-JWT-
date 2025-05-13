"use strict"

const transporter = require('../configs/nodemailer');

module.exports = function sendMail(to, subject, tempFn, data = null) {
    transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to,
        subject,
        html: data ? tempFn(data) : tempFn(),
    }, function (error, success) {
        success ? console.log('SUCCESS:', success) : console.log('ERROR:', error);
    });
};