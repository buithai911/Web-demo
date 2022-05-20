const express = require('express')
const {verifyToken} = require('../middleware/verifyToken')
const { getAllProducts, createOneProduct, updateOneProduct, deleteOneProduct } = require('../controllers/productController')
const Router = express.Router()
const upload = require("../cloudinary/multer");

Router.route('/find').get(getAllProducts)
Router.route('/create').post(upload.single("image"), verifyToken, createOneProduct)
Router.route('/:productId').put(upload.single("image"), verifyToken, updateOneProduct).delete(verifyToken, deleteOneProduct)
module.exports = Router