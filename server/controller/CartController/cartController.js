const dotenv = require('dotenv');
dotenv.config();
const CartModal = require("../../models/order/cart");

// Get all cart
module.exports.getCarts = async (req) => {
    try {
        let carts = await CartModal.find();
        if (!carts) {
            return ({ status: false, error: "Carts Does Not Exist!!" });
        }
        return ({ status: true, result: carts });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create cart by user   
module.exports.createCart = async (data) => {
    try {
        const cart = await CartModal.create(data);

        return ({ status: true, result: cart });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete cart by user   
module.exports.deleteCart = async (id) => {
    try {
        let cart = await CartModal.findById(id);
        if (!cart) {
            return ({ status: false, error: "Cart Does Not Exist!!" });
        }

        cart = await CartModal.findByIdAndDelete(id);

        return ({ status: true, result: cart });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}