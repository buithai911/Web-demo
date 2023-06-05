const express = require('express')

const { login, register } = require('../controllers/authController')
const upload = require("../cloudinary/multer");
const Router = express.Router()

Router.route('/register').post(upload.single("avatar"), register)
Router.route('/login').post(login)

module.exports = Router