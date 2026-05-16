const dotenv = require('dotenv');
const categoryController = require('../../controller/CategoryController/categoryController');
const { error, success } = require('../../utils/halper');
dotenv.config();

// Get all category   
module.exports.getCategories = async (req, res) => {
    try {
        const response = await categoryController.getCategories(req);
        if (!response.status) {
            const result = error(response.error, response.code ? response.code : 500);
            return res.status(response.code ? response.code : 500).json({
                status: response.code ? response.code : 500,
                body: result,
            })
        }

        const result = success("Ok", response.result, 200);

        res.status(201).json({
            status: 201,
            body: result,
        });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}

// Get single category details
module.exports.getSingleCategory = async (req, res) => {
    try {
        const response = await categoryController.getSingleCategory(req.params.id);
        if (!response.status) {
            const result = error(response.error, response.code ? response.code : 500);
            return res.status(response.code ? response.code : 500).json({
                status: response.code ? response.code : 500,
                body: result,
            })
        }

        const result = success("Ok", response.result, 200);

        res.status(201).json({
            status: 201,
            body: result,
        });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}

// Create category by admin
module.exports.createCategory = async (req, res) => {
    try {
        const response = await categoryController.createCategory(req.body);
        if (!response.status) {
            const result = error(response.error, response.code ? response.code : 500);
            return res.status(response.code ? response.code : 500).json({
                status: response.code ? response.code : 500,
                body: result,
            })
        }

        const result = success("Ok", response.result, 200);

        res.status(201).json({
            status: 201,
            body: result,
        });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}

// Update category by admin
module.exports.updateCategory = async (req, res) => {
    try {
        const response = await categoryController.updateCategory(req.params.id,req.body);
        if (!response.status) {
            const result = error(response.error, response.code ? response.code : 500);
            return res.status(response.code ? response.code : 500).json({
                status: response.code ? response.code : 500,
                body: result,
            })
        }

        const result = success("Ok", response.result, 200);

        res.status(201).json({
            status: 201,
            body: result,
        });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}

// Delete category by admin
module.exports.deleteCategory = async (req, res) => {
    try {
        const response = await categoryController.deleteCategory(req.params.id);
        if (!response.status) {
            const result = error(response.error, response.code ? response.code : 500);
            return res.status(response.code ? response.code : 500).json({
                status: response.code ? response.code : 500,
                body: result,
            })
        }

        const result = success("Ok", response.result, 200);

        res.status(201).json({
            status: 201,
            body: result,
        });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}