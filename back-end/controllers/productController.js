const cloudinary = require("../cloudinary/cloudinary");
const Product = require('../models/Product');
//getAllPosts
// exports.getAllPosts = async (req, res, next) => {
//     try {
//         const posts = await Post.find({})
//         console.log(posts)
//         res.status(200).json({
//             status: "success",
//             result: posts.length(),
//             data: {posts}
//         })
//     } catch (error) {
//         res.json(error)
//     }
// }

exports.getAllProducts = async (req, res, next) => {
    await Product.find({}).populate('author', 'name')//.select('content createAt')
        .then(products => {
            //console.log(posts)
            res.status(200).json({ 
                status: "oke",
                data: {products},
            })
        })
        .catch (err => {
            res.json(error)
    })
}


//createOnePosts
exports.createOneProduct = async (req, res, next) => {
    try {
        const {userId} = req.body
        const result = await cloudinary.uploader.upload(req.file.path);
        const product = await Product.create({...req.body, author:userId, image: result.secure_url, cloudinary_id: result.public_id})
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