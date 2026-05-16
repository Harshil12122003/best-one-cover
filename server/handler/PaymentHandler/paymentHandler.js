const dotenv = require('dotenv');
const paymentController = require('../../controller/PaymentController/paymentController');
const { error, success } = require('../../utils/halper');
dotenv.config();

// // Get all order
// module.exports.getOrders = async (req, res) => {
//     try {
//         const response = await orderController.getOrders(req.user);
//         if (!response.status) {
//             const result = error(response.error, response.code ? response.code : 500);
//             return res.status(response.code ? response.code : 500).json({
//                 status: response.code ? response.code : 500,
//                 body: result,
//             })
//         }

//         const result = success("Ok", response.result, 200);

//         res.status(201).json({
//             status: 201,
//             body: result,
//         });
//     } catch (error) {
//         return res.status(500).json({ status: false, error: error.message });
//     }
// }

// // Get single order details 
// module.exports.getSingleOrder = async (req, res) => {
//     try {
//         const response = await orderController.getSingleOrder(req.params.id);
//         if (!response.status) {
//             const result = error(response.error, response.code ? response.code : 500);
//             return res.status(response.code ? response.code : 500).json({
//                 status: response.code ? response.code : 500,
//                 body: result,
//             })
//         }

//         const result = success("Ok", response.result, 200);

//         res.status(201).json({
//             status: 201,
//             body: result,
//         });
//     } catch (error) {
//         return res.status(500).json({ status: false, error: error.message });
//     }
// }

// Get all payments
module.exports.getPayments = async (req, res) => { 
    try {

        const response = await paymentController.getPayments(req);
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

// Process Payment
module.exports.processPayment = async (req, res) => {
    try {

        const response = await paymentController.processPayment(req.user.id,req.body);
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

// Create payment
module.exports.createPayment = async (req, res) => {
    try {

        const response = await paymentController.createPayment(req.user.id,req.body);
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
