const asyncHandler=require("express-async-handler");
const User=require("../models/userModels.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv").config();

const{GoogleGenerativeAI}=require("@google/generative-ai");
const fs=require("fs");
const path=require("path")

//@desc Register a user
//@route POST/api/users/register
//@access public

const registerUser=asyncHandler(async (req,res)=>{
    const{ username,email,password}=req.body;
    // to check that field are not empty
    if(!username || !email || !password){
        res.status(400);
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
   res.json({message:"Register the user"});

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

//@desc send image User
//@route post /api/User/login/run
//@access public

  const searching= asyncHandler(async(req,res)=>{
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  
  // Converts local file information to a GoogleGenerativeAI.Part object.
  function fileToGenerativePart(filepath, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(filepath)).toString("base64"),
        mimeType
      },
    };
  }
  
  async function run() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    const prompt = "What ingredients are present in this dish and can you provide the quantity present(approx) also rough calories of each item and overall approx calories(lower value) ";
  
    const image = [
      fileToGenerativePart((__dirname,"gemini/images/image.jpg"), "image/jpg"),
  
    ];
  
    const result = await model.generateContent([prompt, ...image]);
    const response = await result.response;
    const text = response.text();
    return text;
  } 

    try {
      const text = await run();
      res.status(200).json({ success: true, msg: text });
    } catch (error) {
      console.error("Error in AI generation:", error);
      res.status(500).json({ success: false, msg: "Failed to generate content." });
    }
  
  });


module.exports={registerUser,loginUser,currentUser,searching}
