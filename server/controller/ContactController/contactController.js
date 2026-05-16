const dotenv = require('dotenv');
dotenv.config();
const ContactModal = require("../../models/contact/contact");

// Get all contacts by admin  
module.exports.getContacts = async (req) => {
    try {
        let contacts = await ContactModal.find();
        if (!contacts) {
            return ({ status: false, error: "Contacts Does Not Exist!!" });
        }

        return ({ status: true, result: contacts });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create category by admin   
module.exports.createContact = async (data) => {
    try {
        const contact = await ContactModal.create(data);

        return ({ status: true, result: contact });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete contact by admin   
module.exports.deleteContact = async (id) => {
    try {
        let contact = await ContactModal.findById(id);
        if (!contact) {
            return ({ status: false, error: "Contact Does Not Exist!!" });
        }

        await ContactModal.findByIdAndDelete(id);

        return ({ status: true, result: contact });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}