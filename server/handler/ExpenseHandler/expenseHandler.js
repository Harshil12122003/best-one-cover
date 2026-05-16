const dotenv = require('dotenv');
const expenseController = require('../../controller/ExpenseController/expenseController');
const { error, success } = require('../../utils/halper');
dotenv.config();

// Get all expense   
module.exports.getExpenses = async (req, res) => {
    try {
        const response = await expenseController.getExpenses(req);
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

// Get all expense   
module.exports.getShopExpenses = async (req, res) => {
    try {
        const response = await expenseController.getShopExpenses(req.user.shop);
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

// Get single expense details
module.exports.getSingleExpense = async (req, res) => {
    try {
        const response = await expenseController.getSingleExpense(req.params.id);
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

// Create expense by manager
module.exports.createExpense = async (req, res) => {
    try {
        const response = await expenseController.createExpense(req.body, req.user);
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

// Update expense by manager
module.exports.updateExpense = async (req, res) => {
    try {
        const response = await expenseController.updateExpense(req.params.id,req.body);
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