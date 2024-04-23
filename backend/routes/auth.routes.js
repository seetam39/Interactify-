import express  from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// app.get("api/auth/signup",(req,res)=>{
// console.log("signup");
// });

router.post ("/signup",signup); 
router.post ("/login",login );
router.post ("/logout",logout);

// app.get("api/auth/logout",(req,res)=>{
// console.log("logout");
// });

export default router;