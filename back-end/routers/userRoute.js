const express = require('express')
const Router = express.Router()
const {getProfile, updateProfile} = require('../controllers/userController')
const {verifyToken} = require('../middleware/verifyToken')
const upload = require("../cloudinary/multer");

Router.route('/profile').get(verifyToken, getProfile)
Router.route('/:userId').put(upload.single('avatar'),verifyToken, updateProfile)
module.exports = Router