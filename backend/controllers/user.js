const { Data } = require("emoji-mart");
const User = require("../models/user");
const filterObjects = require("../utils/filterObj");

exports.updateMe = async (req, res, next) => {

    const { user } = req;
    const filteredBody = filterObjects(req.body, "firstName", "lastName", "about", "avatar")
    const updated_user = await User.findByIdAndUpdate(user._id, filteredBody, {
        new: true,
        validateModifiedOnly: true
    })

    res.status(200).json({
        status: "suceess",
        Data: updated_user,
        message: "Profile updated successfully"
    })
}

exports.getUsers = async (req, res, next) => {
    const all_users = await User.find({ verified: true }).select("firstName LastName _id")

    const this_user = req.user
    const remaining_users = all_users.filter((user) => !this_user.friends.includes(user._id) &&
        user._id.toString() !== req.user._id.toString())

    res.status(200).json({
        status:"Success",
        data:remaining_users,
        message:"Users found successfully"
    })
}