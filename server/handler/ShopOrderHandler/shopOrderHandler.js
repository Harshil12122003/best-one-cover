const dotenv = require('dotenv');
const shopOrderController = require('../../controller/ShopOrderController/shopOrderController');
const { error, success } = require('../../utils/halper');
dotenv.config();

// Get all admin orders
module.exports.getShopOrders = async (req, res) => {
    try {
        const response = await shopOrderController.getShopOrders(req);
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

// Get me(admin) orders
module.exports.getMeOrders = async (req, res) => {
  try {
      const response = await shopOrderController.getMeOrders(req.user.shop);
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

// Get single admin order details
module.exports.getSingleShopOrder = async (req, res) => {
    try {
        const response = await shopOrderController.getSingleShopOrder(req.params.id);
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

// Create admin order by admin
module.exports.createShopOrder = async (req, res) => {
    try {
        const response = await shopOrderController.createShopOrder(req.user, req.body);
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

// Update admin order by admin
module.exports.updateShopOrder = async (req, res) => {
    try {
        const response = await shopOrderController.updateShopOrder(req.params.id,req.body);
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

// Delete admin order by admin
module.exports.deleteShopOrder = async (req, res) => {
    try {
        const response = await shopOrderController.deleteShopOrder(req.params.id);
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

// Get shop order item cost price (buying price) from stock model
module.exports.getShopOrderItemCost = async (req, res) => {
    try {
        const response = await shopOrderController.getShopOrderItemCost(req.body);
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