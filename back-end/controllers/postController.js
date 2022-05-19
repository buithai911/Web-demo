const Post = require('../models/Post')
const cloudinary = require("../cloudinary/cloudinary");
const upload = require("../cloudinary/multer");
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

exports.getAllPosts = async (req, res, next) => {
    await Post.find({}).populate('author', 'name')//.select('content createAt')
        .then(posts => {
            //console.log(posts)
            res.status(200).json({ 
                status: "oke",
                data: {posts},
                //result: posts.length()
            })
        })
        .catch (err => {
            res.json(error)
    })
}


//createOnePosts
exports.createOnePost = async (req, res, next) => {
    try {
        const {userId} = req.body
        const result = await cloudinary.uploader.upload(req.file.path);
        const post = await Post.create({...req.body, author:userId, image: result.secure_url, cloudinary_id: result.public_id})
        res.status(200).json({
            status: "success",
            data: {post}
        })
    } catch (error) {
        next(error)
    }
}

//updateOnePosts
exports.updateOnePost = async (req, res, next) => {
    try {
        const {postId} = req.params
        const post = await Post.findByIdAndUpdate(postId, {...req.body}, {new: true, runValidator: true}) // res noi dung update
        res.status(200).json({
            status: "success",
            data: {post}
        })
    } catch (error) {
        next(error)
    }
}

//deleteOnePosts
exports.deleteOnePost = async (req, res, next) => {
    try {
        const {postId} = req.params
        await Post.findByIdAndDelete(postId)
        res.status(200).json({
            status: "success",
            message: "Delete successfull"
        })
    } catch (error) {
        next(error)
    }
} 