const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cloudinary = require("../cloudinary/cloudinary");
exports.register = async (req, res, next) => {
    try {
      const user = await User.create({ ...req.body, avatarurl: "" });
      res.status(200).json({
        status: "success",
        data: { userName: user.name, avatarUrl: user.avatarurl }
      });
      console.log(`registered successfully",\"userId\": \"${user._id}`)
    } catch (error) {
      console.log(`register fail: ${error}`);
      const err = { message: "Email exits", status: 400 };
      next(err);
    }
}
exports.login = async (req, res, next) => {
    try {
        const tokenTime = { expiresIn: "24h" };
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          const err = { message: "Email or password is not correct", status: 400 };
          next(err);
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign(
            { userId: user._id },
            process.env.APP_SECRET,
            tokenTime
          );
          res.status(200).json({
            status: "success",
            data: {
              token,
              userName: user.name,
              id: user._id,
              avatarUrl: user.avatarurl,
              role: user.role
            }
          });
          console.log(`Log-in successfully", \"userId\": \"${user._id}`);
        } else {
          const err = { message: "Email or password is not correct", status: 400 };
          next(err);
        }
      } catch (error) {
        console.log(`Log-in system's failed: ${error}`);
        next(error);
      }
}
exports.getCurrentUser = async (req, res, next) => {
    try {
        const data = {user: null}
        console.log(req.body)
        if (req.body['userId']){
            const user = await User.findById({ _id: req.body['userId']})
            data.user = {userName: user.name }
        }
        res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        next(error)
    }
}