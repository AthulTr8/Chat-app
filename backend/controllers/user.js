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
        status:"suceess",
        Data:updated_user,
        message:"Profile updated successfully"
    })
}