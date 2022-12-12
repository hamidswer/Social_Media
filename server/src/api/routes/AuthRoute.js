import express from "express";
import Protected from "../helpers/user/Protected.js";
import PassportGoogleLogin from "../services/Passport/PassportGoogleLogin.js";
import PassportGoogleCallback from "../services/Passport/PassportGoogleCallback.js";
import PassportLocalLogin from "../services/Passport/PassportLocalLogin.js";
import GetUser from "../helpers/user/GetUser.js";
import PassportLocalRegister from "../services/Passport/PassportLocalRegister.js";
import LogoutUser from "../controllers/user/LogoutUserController.js";
const router = express.Router();

// Google login request.
router.get("/login/google", PassportGoogleLogin);

// Google callback after successfully login.
router.get("/login/google/callback", PassportGoogleCallback);

// Local authentication with username and password.
router.post("/login", PassportLocalLogin);

// Local authentication with username and password.
router.post("/register", PassportLocalRegister);

// Logout user.
router.post("/logout", LogoutUser);

// Get user after authentication.
router.get("/login/google/user", Protected, GetUser);

export default router;
