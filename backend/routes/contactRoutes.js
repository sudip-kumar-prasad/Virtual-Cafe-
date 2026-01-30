const express = require('express');
const router = express.Router();
const {
    submitContactForm,
    getAllContacts
} = require('../controllers/contactController');
const { validateContact } = require('../middleware/validators');

router.post('/', validateContact, submitContactForm);
router.get('/', getAllContacts); // Admin route

module.exports = router;
