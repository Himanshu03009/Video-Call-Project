import isLogin from "../middleware/isLogin.js";
import express from "express";
import { Login, Logout, SignUp } from "../routeController/authController.js";

const router = express.Router();

router.post('/login', Login)

router.post('/signup', SignUp)

router.post('/Logout', isLogin,Logout)

export default router;