const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: function (email) {

                const emailRegex = /^(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

                //  2. Use .test() to return a clean true/false boolean back to Mongoose
                return emailRegex.test(email);
            },
            message: (props) => `${props.value} is not a valid email address!`
        },

    },
    password: {
        type: String
    },
    passwordConfirm: {
        type: String
    },
    PasswordChangedAt: {
        type: Date
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    verified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otp_expiry_time: {
        type: Date
    }
})
// userSchema.pre("save", async function () {
//     // 1. If password was added or changed, hash it!
//     try {
//         if (this.isModified("password") && this.password) {
//         if (!this.password.startsWith('$2')) {
//             this.password = await bcrypt.hash(this.password, 12);
//         }
//     }
//     } catch (error) {
//         console.log(`error: ${error}`)
//     }
    

//     // 2. If OTP was added or changed, hash it!
//     if (this.isModified("otp") && this.otp) {
//         const otpString = this.otp.toString();
//         if (!otpString.startsWith('$2')) {
//             this.otp = await bcrypt.hash(otpString, 12);
//         }
//     }
    
//     // Notice: NO next() or return next() anywhere in this function!
//     // Simply letting the async function finish tells Mongoose it's safe to save.
// });

// // Replace both of your old userSchema.pre("save") blocks with this:
// userSchema.pre("save", async function () {
//     // 1. Handle OTP Hashing safely
//     if (this.isModified("otp") && this.otp) {
//         // Convert the numeric OTP to a string so bcrypt can hash it!
//         this.otp = await bcrypt.hash(this.otp.toString(), 12);
//     }

//     // 2. Handle Password Hashing safely
//     if (this.isModified("password") && this.password) {
//         this.password = await bcrypt.hash(this.password, 12);
//     }
// });
// userSchema.pre("save", async function (next) {
//     try {
//         // 1. If password was added or changed, hash it!
//         if (this.isModified("password") && this.password) {
//             // Check if it's already a bcrypt hash (starts with $2) to avoid double hashing
//             if (!this.password.startsWith('$2')) {
//                 this.password = await bcrypt.hash(this.password, 12);
//             }
//         }

//         // 2. If OTP was added or changed, hash it!
//         if (this.isModified("otp") && this.otp) {
//             const otpString = this.otp.toString();
//             if (!otpString.startsWith('$2')) {
//                 this.otp = await bcrypt.hash(otpString, 12);
//             }
//         }

//         next(); // Use next() at the absolute end of the catch block
//     } catch (err) {
//         next(err);
//     }
// });

// userSchema.pre("save", async function (next) {

//     if (!this.isModified("otp")) return next()
//     //hashing the otp with the cost of 12
//     this.otp = await bcrypt.hash(this.otp, 12)

//     next()
// })

// userSchema.pre("save", async function (next) {

//     if (!this.isModified("password")) return next()
//     //hashing the otp with the cost of 12
//     this.password = await bcrypt.hash(this.password, 12)

//     next()
// })
userSchema.pre("save", async function () {
    try {
        // 👉 FORCE MONGOOSE TO TRACK CHANGES IF A PASSWORD VALUE EXISTS IN THE OPERATION
        if (this.password && !this.password.startsWith('$2')) {
            this.markModified('password');
        }

        // 1. If password was added or changed, hash it!
        if (this.isModified("password") && this.password) {
            if (!this.password.startsWith('$2')) {
                this.password = await bcrypt.hash(this.password, 12);
            }
        }

        // 2. Force Mongoose to track OTP changes too
        if (this.otp && !this.otp.toString().startsWith('$2')) {
            this.markModified('otp');
        }

        // 3. If OTP was added or changed, hash it!
        if (this.isModified("otp") && this.otp) {
            const otpString = this.otp.toString();
            if (!otpString.startsWith('$2')) {
                this.otp = await bcrypt.hash(otpString, 12);
            }
        }

    } catch (error) {
        console.log(`error: ${error}`);
    }
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.correctOTP = async function (candidateOTP, userOTP) {
    return await bcrypt.compare(candidateOTP, userOTP)
}
userSchema.methods.createPasswordResetToken = async function () {
    try {
        const resetToken = crypto.randomBytes(32).toString("hex")

    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000
    return resetToken
    } catch (error) {
        console.log(error)
    }
    
}

userSchema.methods.changedPasswordAfter = async function (timeStamp) {
    return timeStamp < this.PasswordChangedAt
}

const User = new mongoose.model("User", userSchema)
module.exports = User