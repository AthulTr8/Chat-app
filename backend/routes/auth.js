// const router = require("express").Router()

// const authController = require("../controllers/auth")

// router.post("/login", authController.login)

// router.post("/register", authController.register, authController.sendOtp)

// // router.post("/sent-otp", authController.sendOtp)

// router.post("/verify-otp", authController.verifyOTP)

// router.post("/forgot-password", authController.forgotPassword)

// router.post("/reset-password", authController.resetPassword)

// module.exports = router

const router = require("express").Router();

const authController = require("../controllers/auth");

router.post("/login", authController.login);

router.post("/register", authController.register, authController.sendOtp);
router.post("/verify", authController.verifyOTP);
router.post("/send-otp", authController.sendOtp);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;