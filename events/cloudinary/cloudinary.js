const cloudinary = require('cloudinary').v2;
 const    ct={}
ct.cloudinaryAddImage=async(filePath) =>{ 
    try { 
        const result =  cloudinary.uploader.upload(filePath, {
            folder: 'digital_signatures',
        });console.log(result)

        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error uploading image to Cloudinary");
    }
}
module.exports=ct;
        