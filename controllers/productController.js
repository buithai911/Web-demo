const cloudinary = require("../cloudinary/cloudinary");
const Product = require('../models/Product');

//getAllProducts
exports.getAllProducts = async (req, res, next) => {
    await Product.find({}).populate('seller', 'name')
        .then(products => {
            res.status(200).json({ 
                status: "success",
                data: {products},
            })
        })
        .catch (err => {
            next(err)
    })
}

//searchProducts
exports.searchProducts = async (req, res, next) => {
    try {
        let query={};
        if(req.query.keyword){
            query.$or=[
                { "name" : { $regex: req.query.keyword, $options: 'i' } },
            	{ "description" : { $regex: req.query.keyword, $options: 'i' } },];
            }
            let product=await Product.find(query)
            return res.status(200).send({
                message:'success',
                data:product
            })
    } catch (error) {
        next(err)
    }
}

//createOnePosts
exports.createOneProduct = async (req, res, next) => {
    try {
        const {userId} = req.body
        const result = await cloudinary.uploader.upload(req.file.path);
        const product = await Product.create({...req.body, seller:userId, image: result.secure_url, cloudinary_id: result.public_id})
        res.status(200).json({
            status: "success",
            data: {product}
        })
    } catch (error) {
        next(error)
    }
}

//updateOnePosts
exports.updateOneProduct = async (req, res, next) => {
    try {
        const {productId} = req.params
        const product = await Product.findByIdAndUpdate( productId, req.body, {new: true, runValidator: true}) // res noi dung update
        res.status(200).json({
            status: "success",
            data: {product}
        })
        
    } catch (error) {
        next(error)
    }
}

//deleteOnePosts
exports.deleteOneProduct = async (req, res, next) => {
    try {
        const {productId} = req.params
        await Product.findByIdAndDelete(productId)
        res.status(200).json({
            status: "success",
            message: "Delete successfull"
        })
    } catch (error) {
        next(error)
    }
} 