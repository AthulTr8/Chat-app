const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator");
const crypto = require("crypto")
// const { default: mongoose } = require("mongoose")
const User = require("../models/user")
const filterObjects = require("../utils/filterObj")
const { promisify } = require("util")
const { decode } = require("punycode")
const mailService = require("../services/mailer")
const otp = require("../Templates/mail/otp");
const { token } = require("morgan");

function signToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET)
}

exports.login = async (req, res, next) => {

    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({
            status: "error",
            message: "Both email and password are required"
        })
    }

    const user = await User.findOne({ email: email }).select("+password")

    if (!user || !(await user.correctPassword(password, user.password))) {
        res.status(400).json({
            status: "error",
            message: "email or password is incorrect"
        })
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: "Success",
        message: "Logged in successfully",
        token: token,
        user_id: user._id
    })

}

// exports.register = async (req, res, next) => {
//     const { firstName, lastName, email, password } = req.body

//     const filterbody = filterObjects(req.body, "firstName", "lastName", "password", "email")
//     const existing_user = await User.findOne({ email: email })
//     if (existing_user && existing_user.verified) {
//         res.status(400).json({
//             status: "Error",
//             message: "Account already exist. Please login"
//         })
//     }
//     else if (existing_user) {
//         await User.findOneAndUpdate({ email: email }, filterbody, { new: true, validateModifiedOnly: true })
//         req.userId = existing_user._id
//         next()
//     }
//     else {
//         const new_user = await User.create({... filterbody })
//         req.userId = new_user._id
//         next()
//     }
// }
// exports.register = async (req, res, next) => {
//     const { firstName, lastName, email, password } = req.body;

//     // 1. ADD THIS LOG TO SEE IF FILTEROBJECTS IS EMPTY
//     const filterbody = filterObjects(req.body, "firstName", "lastName", "password", "email");
//     console.log("👉 FILTERBODY OUTPUT IS:", filterbody); 

//     const existing_user = await User.findOne({ email: email });

//     if (existing_user && existing_user.verified) {
//         return res.status(400).json({
//             status: "Error",
//             message: "Account already exists. Please login"
//         });
//     }
//     else if (existing_user) {
//         // 2. Fix findOneAndUpdate to use req.body directly to verify
//         await User.findOneAndUpdate({ email: email }, { firstName, lastName, password }, { new: true, runValidators: true });
//         req.userId = existing_user._id;
//         return next();
//     }
//     else {
//         // 3. PASS THE DESTRUCTURED VALUES DIRECTLY (Bypass the broken utility)
//         const new_user = await User.create({ 
//             firstName, 
//             lastName, 
//             email, 
//             password 
//         });

//         req.userId = new_user._id;
//         return next();
//     }
// };
// exports.register = async (req, res, next) => {
//     const { firstName, lastName, email, password } = req.body;

//     const existing_user = await User.findOne({ email: email });

//     if (existing_user && existing_user.verified) {
//         return res.status(400).json({
//             status: "Error",
//             message: "Account already exists. Please login"
//         });
//     }
//     else if (existing_user) {
//         // If they exist but aren't verified, update them
//         await User.findOneAndUpdate(
//             { email: email }, 
//             { firstName, lastName, password }, 
//             { new: true, runValidators: true }
//         );

//         // Generate and send your verification OTP here if you have that logic!

//         return res.status(200).json({
//             status: "success",
//             message: "Account details updated. Verification OTP sent!",
//             userId: existing_user._id
//         });
//     }
//     else {
//         // Create the new user document
//         const new_user = await User.create({ 
//             firstName, 
//             lastName, 
//             email, 
//             password 
//         });

//         // 👉 CHANGE THIS: Remove return next() and send the success response directly!
//         return res.status(201).json({
//             status: "success",
//             message: "Registration successful! Account created.",
//             data: {
//                 id: new_user._id,
//                 firstName: new_user.firstName,
//                 email: new_user.email
//             }
//         });
//     }
// };


// exports.register = async (req, res, next) => {
//     // 1. Filter out everything except the fields we explicitly allow
//     const filterbody = filterObjects(req.body, "firstName", "lastName", "password", "email");

//     const existing_user = await User.findOne({ email: req.body.email });

//     if (existing_user && existing_user.verified) {
//         return res.status(400).json({
//             status: "Error",
//             message: "Account already exists. Please login"
//         });
//     }
//     else if (existing_user) {
//         // 2. Safe update: filterbody protects against role tampering
//         await User.findOneAndUpdate(
//             { email: req.body.email }, 
//             filterbody, 
//             { new: true, runValidators: true }
//         );

//         return res.status(200).json({
//             status: "success",
//             message: "Account details updated. Verification OTP sent!"
//         });
//     }
//     else {
//         // 3. Safe creation: only contains the permitted filtered keys
//         const new_user = await User.create(filterbody);

//          res.status(201).json({
//             status: "success",
//             message: "Registration successful!",
//             data: { id: new_user._id, email: new_user.email }
//         });
//         next()
//     }
// };
exports.register = async (req, res, next) => {
    try {
        const filterbody = filterObjects(req.body, "firstName", "lastName", "password", "email");
        const existing_user = await User.findOne({ email: req.body.email });

        if (existing_user && existing_user.verified) {
            return res.status(400).json({
                status: "Error",
                message: "Account already exists. Please login"
            });
        }

        let user;
        if (existing_user) {

            Object.assign(existing_user, filterbody);

            // 2. Run .save() -> This triggers your pre("save") hashing hooks perfectly!
            user = await existing_user.save();
        } else {
            user = await User.create(filterbody);
        }

        // 👉 PASS THE USER TO THE NEXT MIDDLEWARE
        req.user = user;
        req.userId = user._id;

        // 👉 CALL NEXT WITHOUT SENDING A RESPONSE YET
        return next();

    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
};



// exports.sendOtp = async (req, res, next) => {
//     console.log("reached send otp")
//     const { userId } = req
//     const newotp = otp.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })

//     const otp_expiry_time = Date.now() + 10 * 60 * 1000 //10 min extra from the otp send

//     await User.findByIdAndUpdate(userId, {
//         otp: newotp,
//         otp_expiry_time,
//     })

//     // TODO email part
//     mailService.sendEmail({
//         from:"VerifiedEmail",
//         to:"example@gmail.com",
//         subject:"OTP for tawk",
//         html:otp(user.firstName, newotp),
//         text:`Your otp is ${newotp}. This is valid for 10 mins`
//     }).then(()=>{

//     }).catch((error)=>{
//         console.log(`error: ${error}`)
//     })

//     res.status(200).json({
//         status: "Success",
//         message: "OTP send successfully"
//     })
// }

exports.sendOtp = async (req, res, next) => {
    try {
        console.log("reached send otp");
        const { userId } = req; // This comes from your register controller!

        // 1. FETCH THE ACTUAL USER FROM THE DATABASE
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        // 2. GENERATE THE OTP
        const newotp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 mins expiry

        // 3. ASSIGN VALUES DIRECTLY TO THE USER DOCUMENT
        user.otp = newotp.toString();
        user.otp_expiry_time = otp_expiry_time;

        // 4. SAVE THE USER (This triggers your pre("save") hook to safely hash the OTP!)
        await user.save({ validateBeforeSave: false });

        // 5. EMAIL PART (Now user.firstName and user.email work perfectly!)
        console.log(`✉️ Mock Email: Sent OTP [${newotp}] cleanly to ${user.email}`);
        // 6. RESPOND TO POSTMAN
        return res.status(200).json({
            status: "Success",
            message: "OTP sent successfully"
        });

    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
};


exports.verifyOTP = async (req, res, next) => {
    const { email, otp } = req.body

    const user = await User.findOne({
        email,
        otp_expiry_time: { $gt: Date.now() }
    })
    if (!user) {
        res.status(400).json({
            status: "error",
            message: "Email is invalid or OTP is expired"
        })
    }

    if (!await user.correctOTP(otp, user.otp)) {
        res.status(500).json({
            status: "Error",
            message: "Invalid OTP"
        })
    }

    user.verified = true
    user.otp = undefined

    await user.save({ new: true, validateModifiedOnly: true })

    const token = signToken(user._id);

    res.status(200).json({
        status: "Success",
        message: "OTP verified successfully",
        token: token,
        user_id:user._id
    })

}

exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.status(400).json({
            status: "error",
            message: "No user exist"
        })
        return
    }
    // generating random reset token
    const resetToken = user.createPasswordResetToken()

    console.log(resetToken)
    const resetURL = `https://tawk.com/auth/reset-password/?code=${resetToken}`
    try {

        await user.save({ validateBeforeSave: false })

        res.status(200).json({
            status: "Success",
            message: "Reset password link is send to email"
        })
    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        await user.save({ validateBeforeSave: false })

        res.status(500).json({
            status: "error",
            message: "There was an error sending the email, please try again later"
        })
    }

}

exports.resetPassword = async (req, res, next) => {
    const tokenFromUrl = req.body.token;

    if (!tokenFromUrl) {
        return res.status(400).json({
            status: "error",
            message: "Reset token missing from URL"
        });
    }

    // 2. Hash the incoming URL token to compare it safely against the DB record
    const hashedToken = crypto.createHash("sha256").update(tokenFromUrl).digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    })
    if (!user) {
        res.status(400).json({
            status: "error",
            message: "Token is invalid or expired"
        })
        return
    }
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm

    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    const token = signToken(user._id);

    res.status(200).json({
        status: "Success",
        message: "Password reseted successfully",
        token: token
    })

}

exports.protect = async (req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt
    } else {
        res.status(400).json({
            status: "error",
            message: "You are not logged in! Please log in to get access"
        })
        return
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    const this_user = await User.findById(decoded.userId)
    if (!this_user) {
        res.status(400).json({
            status: "error",
            message: "The user doesn't exist"
        })
        return
    }

    if (this_user.changedPasswordAfter(decode.iat)) {
        res.status(400).json({
            status: "error",
            message: "User recently updated password! please log in again"
        })
    }

    req.user = this_user
    next();

}
