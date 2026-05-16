const dotenv = require('dotenv');
dotenv.config();
const CategoryModal = require("../../models/product/category");

// Get all category   
module.exports.getCategories = async (req) => {
    try {
        const filter = { active: true };

        let categories = await CategoryModal.find(filter);
        if (!categories) {
            return ({ status: false, error: "Categories Does Not Exist!!" });
        }

        return ({ status: true, result: categories });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get single category details 
module.exports.getSingleCategory = async (id) => {
    try {
        let category = await CategoryModal.findById(id);
        if (!category) {
            return ({ status: false, error: "Category Does Not Exist!!" });
        }
        return ({ status: true, result: category });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create category by admin   
module.exports.createCategory = async (data) => {
    try {
        const isExist = await CategoryModal.find({ name: data.name });
        if (isExist.length > 0) {
            return ({ status: false, error: "Category Already Exist!!" });
        }

        const category = await CategoryModal.create(data);

        return ({ status: true, result: category });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update category by admin
module.exports.updateCategory = async (id, data) => {
    try {
        let category = await CategoryModal.findById(id);
        if (!category) {
            return ({ status: false, error: "Category Does Not Exist!!" });
        }

        const isExist = await CategoryModal.find({ name: data.name });
        if (isExist.length > 0) {
            return ({ status: false, error: "Category Already Exist!!" });
        }

        category = await CategoryModal.findByIdAndUpdate(id, data, { new: true, runValidators: true, useFindAndModify: false });

        return ({ status: true, result: category });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete category by admin   
module.exports.deleteCategory = async (id) => {
    try {
        let category = await CategoryModal.findById(id);
        if (!category) {
            return ({ status: false, error: "Category Does Not Exist!!" });
        }

        category.active = false;
        await category.save();

        return ({ status: true, result: category });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}