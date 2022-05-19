const express = require('express')
const {verifyToken} = require('../middleware/verifyToken')
const { getAllPosts, createOnePost, updateOnePost, deleteOnePost } = require('../controllers/postController')
const Router = express.Router()
const upload = require("../cloudinary/multer");

Router.route('/find').get(getAllPosts)
Router.route('/create').post(upload.single("image"), verifyToken, createOnePost)
Router.route('/:postId').put(verifyToken, updateOnePost).delete(verifyToken, deleteOnePost)
module.exports = Router