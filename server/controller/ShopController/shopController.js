const dotenv = require('dotenv');
dotenv.config();
const ShopModal = require("../../models/shop/shop");
const AdminModal = require("../../models/user/admin");
const bcrypt = require("bcrypt");
const sendEmail = require("../../utils/sendEmail");
const AdminModel = require("../../models/user/admin");

// Get all shop  
module.exports.getShops = async (req) => {
    try {
        const filter = { active: true };

        let shops = await ShopModal.find(filter);
        if (!shops) {
            return ({ status: false, error: "Shops Does Not Exist!!" });
        }
        return ({ status: true, result: shops });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get single shop details 
module.exports.getSingleShop = async (id) => {
    try {
        let shop = await ShopModal.findById(id);
        if (!shop) {
            return ({ status: false, error: "Shop Does Not Exist!!" });
        }
        return ({ status: true, result: shop });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create shop by admin   
module.exports.createShop = async (data) => {
    try {
        const admin = await AdminModel.find({email: data.email.toLowerCase()}).select("-password");
        if (admin.length > 0) {
            return ({ status: false, error: "Manager Already Exist!" });
        }

        const shop = await ShopModal.create(data);

        const password = generateP();
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const mangerData = {
            email: data.email.toLowerCase(),
            // fname: "",
            // lname: "",
            // avatar: {
            //     public_id: "",
            //     url: "",
            // },
            // mobile: "",
            shop: shop._id,
            password: hashPassword,
            role: "manager",
        };

        const manager = await AdminModal.create(mangerData);

        const dataHtml = `<h1>Welcome to Best 1 Cover House</h1><br/><p>Please use below credentials for login.</p><p>email: ${data.email}</p><p>password: ${password}</p> <p>Please Login using this link: <a href="https://best1.cover-house.com">https://best1.cover-house.com</a><p>`;
        const subject = "Please Logged in Best 1 Cover House";
        sendEmail(data.email, subject, dataHtml);

        return ({ status: true, result: { shop, manager } });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update shop by admin
module.exports.updateShop = async (id, data) => {
    try {
        let shop = await ShopModal.findById(id);
        if (!shop) {
            return ({ status: false, error: "Shop Does Not Exist!!" });
        }

        shop = await ShopModal.findByIdAndUpdate(id, data, { new: true, runValidators: true, useFindAndModify: false });

        return ({ status: true, result: shop });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete shop by admin   
module.exports.deleteShop = async (id) => {
    try {
        let shop = await ShopModal.findById(id);
        if (!shop) {
            return ({ status: false, error: "Shop Does Not Exist!!" });
        }

        shop.active = false;
        await shop.save();

        return ({ status: true, result: shop });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

function generateP() {
    var pass = "";
    var str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

    for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);

        pass += str.charAt(char);
    }

    return pass;
}