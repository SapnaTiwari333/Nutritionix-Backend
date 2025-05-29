const { GoogleGenerativeAI } = require("@google/generative-ai");
const asyncHandler = require("express-async-handler");
const fs = require("fs-extra");
const dotenv=require("dotenv").config();
const { fileToGenerativePart } = require("../utils/imageUtils");
const path=require("path")




//@desc send image User
//@route post /api/Images/login/run
//@access public



  const searching= asyncHandler(async(req,res)=>{

    //check if file was uploaded

    if(!req.file){
      res.status(400);
      throw new Error("No image uploaded");
    }

    const filePath=req.file.path;
    const mimeType=req.file.mimetype;

    //get prompt from request or use default

    const prompt=req.body.prompt || "What ingredients are present in this dish and can you provide the quantity present(approx) also rough calories of each item and overall approx calories(lower value)";

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  

  
  async function run() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    //const prompt = "What ingredients are present in this dish and can you provide the quantity present(approx) also rough calories of each item and overall approx calories(lower value) ";
  
    const image = [fileToGenerativePart(filePath, mimeType)];
  
    const result = await model.generateContent([prompt, ...image]);
    const response = await result.response;
    const text = response.text();
    return text;
  } 

    try {
      const text = await run();
      res.status(200).json({ 
        success: true,
         msg: text });
    } catch (error) {
      console.error("Error in AI generation:", error);
      res.status(500).json({
         success: false,
          msg: "Failed to generate content." });
    }finally {
        // Always run this whether success or error
        try {
            //o ensure the uploaded image file is deleted after it's used
          await fs.remove(filePath);
          console.log("Image deleted:", filePath);
        } catch (err) {
          console.error("Failed to delete image:", err.message);
        }
      }
  
  });

  module.exports={searching};