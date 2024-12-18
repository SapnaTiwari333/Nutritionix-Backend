const express =require("express");
const { registerUser,loginUser,currentUser,searching}=require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router=express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/current",validateToken,currentUser);

router.post("/login/run",searching);


module.exports=router;
