const dotenv = require('dotenv');
const counterController = require('../../controller/CounterController/counterController');
const { error, success } = require('../../utils/halper');
dotenv.config();

// Get all counter   
module.exports.getCounters = async (req, res) => {
    try {
        const response = await counterController.getCounters(req);
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

// Get all counter   
module.exports.getShopCounters = async (req, res) => {
    try {
        const response = await counterController.getShopCounters(req.user.shop);
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

// Get single counter details
module.exports.getSingleCounter = async (req, res) => {
    try {
        const response = await counterController.getSingleCounter(req.params.id);
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

// Create counter by manager
module.exports.createCounter = async (req, res) => {
    try {
        const response = await counterController.createCounter(req.body, req.user);
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

// Update counter by manager
module.exports.updateCounter = async (req, res) => {
    try {
        const response = await counterController.updateCounter(req.params.id,req.body);
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