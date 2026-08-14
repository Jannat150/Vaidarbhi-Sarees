import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await Contact.create({ name, email, subject, message, userId: req.user?._id || null });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message not found" });

    contact.name = req.body.name || contact.name;
    contact.email = req.body.email || contact.email;
    contact.subject = req.body.subject || contact.subject;
    contact.message = req.body.message || contact.message;
    await contact.save();

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message not found" });

    await contact.deleteOne();
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const replyToContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message not found" });

    contact.reply = req.body.reply;
    contact.repliedAt = new Date();
    await contact.save();

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReply = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message not found" });

    contact.reply = req.body.reply;
    contact.repliedAt = new Date();
    await contact.save();

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message not found" });

    contact.reply = "";
    contact.repliedAt = null;
    await contact.save();

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
