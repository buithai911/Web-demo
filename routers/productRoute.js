const express = require('express')
const {verifyToken} = require('../middleware/verifyToken')
const { getAllProducts, createOneProduct, updateOneProduct, deleteOneProduct, searchProducts } = require('../controllers/productController')
const Router = express.Router()
const upload = require("../cloudinary/multer");

Router.route('/getallproducts').get(getAllProducts)
Router.route('/search').get(searchProducts)
Router.route('/create').post(upload.single("image"), verifyToken, createOneProduct)
Router.route('/:productId').put(upload.single("image"), verifyToken, updateOneProduct).delete(verifyToken, deleteOneProduct)
module.exports = Router