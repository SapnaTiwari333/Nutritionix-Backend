const fs=require("fs-extra");


/**
 * Converts local file information to a GoogleGenerativeAI.Part object
 * @param {string} filepath - Path to the image file
 * @param {string} mimeType - MIME type of the image
 * @returns {object} - Part object for Google Generative AI
 */


function fileToGenerativePart(filepath,mimeType){
    return {
        inlineData:{
            data:Buffer.from(fs.readFile(filepath)).toString("base64"),
            mimeType,
        }
    };
}

module.exports={fileToGenerativePart};