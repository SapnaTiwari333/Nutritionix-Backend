const asyncHandler=require("express-async-handler");
const User=require("../models/userModels.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv").config();




//@desc Register a user
//@route POST/api/users/register
//@access public

const registerUser=asyncHandler(async (req,res)=>{
    const{ username,email,password}=req.body;
    // to check that field are not empty
    if(!username || !email || !password){
        throw new Error("All fields are mandatory!");
    }

    // to check if user already exist
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hash password
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("Hashed Password:", hashedPassword);

    //create new users
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });

    console.log(`User created ${user}`);
   

    //send information to the user
    if(user){
        res.status(201).json({ _id:user.id,  email:user.email }); //201 resource is created
    }else{
        res.status(400);
        throw new Error("User data is not valid");
         
    }
   //res.json({message:"Register the user"});

});


//@desc login user
//@route POST /api/users/login
//access public

const loginUser=asyncHandler(async (req,res)=>{
    const{ email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user=await User.findOne({email});
    //compare password with hashedpassword
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,

        {expiresIn:"15m"}
    )

      res.status(200).json({accessToken});
    }
    else
    {
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

//@desc Current user info
//@route GET /api/users/current
//@access private

const currentUser=asyncHandler(async(req,res)=>{ 
    res.json(req.user);

});




module.exports={registerUser,loginUser,currentUser}
