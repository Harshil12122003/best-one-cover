const dotenv = require('dotenv');
const authController = require('../../controller/AuthController/authController');
const { error, success } = require('../../utils/halper');
dotenv.config();

// Register a New user
module.exports.registerUser = async (req, res) => {
    try {
        const response = await authController.registerUser(req.body);
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

// Login User 
module.exports.loginUser = async (req, res) => {
    try {
        if(!req.body.email || !req.body.password){
            const result = error("Invalid Details!", 400);
            return res.status(400).json({
                status: result.code ? result.code : 500,
                body: result,
            })
        }
        
        const response = await authController.loginUser(req.body);
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