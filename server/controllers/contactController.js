const Contact = require("../models/Contact");

// CREATE message
exports.createMessage = async (req, res) => {
  try {
    const message = new Contact(req.body);
    await message.save();
    res.json({ success: true, message: "Message saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all messages (optional admin use)
exports.getMessages = async (req, res) => {
  const messages = await Contact.find();
  res.json(messages);
};