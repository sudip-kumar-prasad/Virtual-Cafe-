const Contact = require('../models/Contact');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
        name,
        email,
        subject,
        message
    });

    // TODO: Send email notification to cafe owner
    // This can be implemented later with nodemailer

    res.status(201).json({
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
        data: {
            id: contact._id,
            name: contact.name,
            createdAt: contact.createdAt
        }
    });
});

// @desc    Get all contact submissions (Admin only - for future use)
// @route   GET /api/contact
// @access  Private (Admin)
const getAllContacts = asyncHandler(async (req, res) => {
    const { status } = req.query;

    let filter = {};
    if (status) {
        filter.status = status;
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });

    res.json({
        success: true,
        count: contacts.length,
        data: contacts
    });
});

module.exports = {
    submitContactForm,
    getAllContacts
};
