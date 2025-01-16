import messageModel from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;
    const newMessage = await messageModel.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });
    //todo do real time sending of message

    res.status(200).json({ success: true, content: newMessage });
  } catch (error) {
    console.log("error in sendMessage", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversation = await messageModel
      .find({
        $or: [
          { sender: req.user._id, receiver: userId },
          { sender: userId, receiver: req.user._id },
        ],
      })
      .populate("sender", "name image")
      .populate("receiver", "name image")
      .sort({ createdAt: 1 });
    res.status(200).json({ success: true, content: conversation });
  } catch (error) {
    console.log("error in getConversation", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
