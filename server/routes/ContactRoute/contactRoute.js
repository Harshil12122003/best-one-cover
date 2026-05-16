const express = require("express");
const contactHandler = require("../../handler/ContactHandler/contactHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/contacts', authUser, contactHandler.getContacts);
router.post('/contact/new',authUser, contactHandler.createContact);
router.delete('/contact/:id',authUser, contactHandler.deleteContact);

module.exports = router;