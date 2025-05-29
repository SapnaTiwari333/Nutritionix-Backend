const express=require("express");
const { upload } = require("../middleware/multer");
const { searching } = require("../controller/imageController");

const router=express.Router();


router.post("/login/run",upload.single("image"),searching);

module.exports=router;