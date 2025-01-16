import userModel from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    //we will handle image uploading here as well.
    const { image, ...otherData } = req.body;
    let updatedData = otherData;
    if (image) {
      // base 64 format
      if (image.startswith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image);
          updatedData.image = uploadResponse.secure_url;
        } catch (error) {
          console.log("error in image upload", error.message);
          return res
            .status(500)
            .json({ success: false, message: "image upload failed" });
        }
      }
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      updatedData,
      { new: true }
    );
    res.status(200).json({ success: true, content: updatedUser });
  } catch (error) {
    console.log("error in updateProfile", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
