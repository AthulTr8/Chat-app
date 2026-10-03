const { Data } = require("emoji-mart");
const User = require("../models/user");
const filterObjects = require("../utils/filterObj");
const FriendRequest = require("../models/friendRequest");

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

// exports.getUsers = async (req, res, next) => {
//     const all_users = await User.find({ verified: true }).select("firstName LastName _id")
// console.log(all_users)
//     const this_user = req.user
//     const remaining_users = all_users.filter((user) => !this_user.friends.includes(user._id) &&
//         user._id.toString() !== req.user._id.toString())
//         console.log(remaining_users)
//     res.status(200).json({
//         status: "Success",
//         data: remaining_users,
//         message: "Users found successfully"
//     })
// }

exports.getUsers = async (req, res, next) => {
    try {
        const this_user = req.user;

        // 1. Gather all friend IDs and convert them explicitly to standard strings
        const friendIds = this_user.friends.map(id => id.toString());
       const pendingRequest = await FriendRequest.find({
        sender: this_user._id
       })
       const sentRequests = pendingRequest.map(req => req.recipient.toString())
        // 2. Add your own user ID to that exclusion list array
        const excludeIds = [...friendIds, ...sentRequests, this_user._id.toString()];

        // 3. Let MongoDB handle all filtering instantly via the $nin (Not In) operator
        const remaining_users = await User.find({
            // Remove 'verified: true' temporarily if your mock database data isn't verified yet
            verified: true, 
            _id: { $nin: excludeIds } // Finds users whose ID is NOT inside your exclusion list
        }).select("firstName lastName _id"); // Fixed typo: 'LastName' to 'lastName' if applicable

        console.log("Filtered users sent to frontend:", remaining_users);

        res.status(200).json({
            status: "Success",
            data: remaining_users,
            message: "Users found successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

exports.getRequests = async (req, res, next) => {
    const requests = await FriendRequest.find({ recipient: req.user._id }).populate("sender", "_id firstName lastName")

    res.status(200).json({
        status: "Success",
        data: requests,
        message: "friends requests found successfully"
    })
}

exports.getFriends = async (req, res, next) => {
    const this_user = await User.findById(req.user._id).populate("friends", "_id firstName lastName")

    res.status(200).json({
        status: "Success",
        data: this_user.friends,
        message: "friends found successfully"
    })
}