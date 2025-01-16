import userModel from "../models/user.model.js";

export const swipeRight = async (req, res) => {
  try {
    const { likedUserId } = req.params;
    const currentUser = await userModel.findById(req.user._id);
    const likedUser = await userModel.findById(likedUserId);
    //add to like
    if (!currentUser.likes.includes(likedUserId))
      currentUser.likes.push(likedUserId);
    //todo send notification when a match is there
    //check if the liked user has liked the current user, if yes then match
    if (likedUser.likes.includes(req.user._id)) {
      likedUser.matches.push(req.user._id);
      currentUser.matches.push(likedUserId);
    }
    await currentUser.save();
    await likedUser.save();
  } catch (error) {
    console.log("error in swipeRight", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const swipeLeft = async (req, res) => {
  try {
    const { dislikedUserId } = req.params;
    const currentUser = await userModel.findById(req.user._id);
    //add to dislike
    if (!currentUser.dislikes.includes(dislikedUserId))
      currentUser.dislikes.push(dislikedUserId);
    await currentUser.save();
    res
      .status(200)
      .json({ success: true, message: "User disliked", content: currentUser });
  } catch (error) {
    console.log("error in swipeLeft", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMatches = async (req, res) => {
  try {
    const user = await userModel
      .findbyId(req.user._id)
      .populate("matches", "name image");
    res.status(200).json({ success: true, content: user.matches });
  } catch (error) {
    console.log("error in getMatches", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getUserProfiles = async (req, res) => {
  try {
    //  test cases -
    //  eliminate my profile from list,
    //  eliminate liked and disliked profiles,
    //  eliminate already matched profiles,
    //  filter according to the preference of the user

    const currentUser = await userModel.findById(req.user._id);
    const users = await userModel.find({
      $and: [
        { _id: { $ne: req.user._id } },
        { _id: { $nin: currentUser.likes } },
        { _id: { $nin: currentUser.dislikes } },
        { _id: { $nin: currentUser.matches } },
        {
          gender:
            //should be male/female in case they want both otherwise a singular choice of their preference
            currentUser.genderPreference === "both"
              ? { $in: ["male", "female"] }
              : currentUser.genderPreference,
        },
        {
          //either same sex as current user or both
          genderPreference: { $in: [currentUser.gender, "both"] },
        },
      ],
    });
    res.status(200).json({ success: true, content: users });
  } catch (error) {
    console.log("error in getUserProfiles", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
