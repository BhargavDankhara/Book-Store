import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ENV_VARS } from "../config/envVars.js";

cloudinary.config({
  cloud_name: ENV_VARS.CLOUDINARY_NAME,
  api_key: ENV_VARS.CLOUDINARY_API_KEY,
  api_secret: ENV_VARS.CLOUDINARY_API_SECRET,
});

export async function uplodeOnCloudinary(loaclFp) {
  try {
    if (!loaclFp) return null;

    //uplode on cloudinary
    const response = await cloudinary.uploader.upload(loaclFp, {
      resource_type: "auto",
    });
    // uplode successfully
    console.log("file uploaded successfully on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(loaclFp);
    return null;
  }
}
