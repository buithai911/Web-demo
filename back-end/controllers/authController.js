const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cloudinary = require("../cloudinary/cloudinary");
exports.register = async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const user = await User.create({ ...req.body, avatar:result.secure_url, cloudinary_id:result.public_id})
        const token = jwt.sign({userId: user._id}, process.env.APP_SECRET)
        res.status(200).json({
            status: 'sucsess',
            data: {token, userName: user.name, avatar:result.secure_url, cloudinary_id:result.public_id}
        })
    } catch (error) {
        next(error)
    }
}
exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            const err = new Error('Email is not correct')
            err.statusCode = 400
            return next(err)
        }
        if(bcrypt.compareSync(req.body.password, user.password)){ // (mật khẩu thật, mật khẩu đã hash)
            const token = jwt.sign({userId: user._id}, process.env.APP_SECRET)
            res.status(200).json({
            status: 'sucsess',
            data: {token, userName: user.name}
            })
        }else{
            const err = new Error('Password is not correct')
            err.statusCode = 400
            return next(err)
        }
    } catch (error) {
        next(error)
    }
}
exports.getCurrentUser = async (req, res, next) => {
    try {
        const data = {user: null}
        if (req.body['userId']){
            const user = await User.findOne({ id: req.body['userId']})
            data.user = {userName: user.name }
        }
        res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        res.json(error)
    }
}