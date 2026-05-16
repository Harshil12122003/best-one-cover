const dotenv = require("dotenv");
dotenv.config();
const ShopOrderModal = require("../../models/shop/shopOrder");
const StockModal = require("../../models/product/stock");
const ShopModal = require("../../models/shop/shop");
const io = require('socket.io')();


// Get all shop orders
module.exports.getShopOrders = async (req) => {
  try {
    const { shopId, startDate, endDate, orderStatus } = req.query;
    const filter = {};

    if (shopId) {
      filter.shop = shopId;
    }

    if (startDate && endDate) {
      filter.orderDate = { $gte: startDate, $lte: endDate };
    }

    if (orderStatus) {
      filter.orderStatus = orderStatus;
    }
    const shopOrders = await ShopOrderModal.find(filter).populate("shop").sort({"createdAt": -1});
    if (!shopOrders) {
      return { status: false, error: "Shop Orders Does Not Exist!!" };
    }

    return { status: true, result: shopOrders };
  } catch (error) {
    return { status: false, code: 500, error: error.message };
  }
};

// Get me(shop) orders
module.exports.getMeOrders = async (data) => {
  try {
    const meOrders = await ShopOrderModal.find({ shop: data }).sort({ orderDate: "-1" });
    if (!meOrders) {
      return { status: false, error: "Shop Orders Does Not Exist!!" };
    }
    return { status: true, result: meOrders };
  } catch (error) {
    return { status: false, code: 500, error: error.message };
  }
};

// Get single shop order details
module.exports.getSingleShopOrder = async (id) => {
  try {
    let shopOrder = await ShopOrderModal.findById(id).populate("shop");
    if (!shopOrder) {
      return { status: false, error: "Shop Order Does Not Exist!!" };
    }
    return { status: true, result: shopOrder };
  } catch (error) {
    return { status: false, code: 500, error: error.message };
  }
};

// Create shop order by manager
module.exports.createShopOrder = async (user, data) => {
  try {
    const isNotExistStock = [];
    const isNotExistQty = [];

    const promiseArray = data.orderItems.map(async (orderItem) => {
      return new Promise(async (res, rej) => {
        const stock = await StockModal.find({
          $and: [
            { "brand.id": orderItem.brand.id },
            { "model.id": orderItem.model.id },
            { "category.id": orderItem.category.id },
            { "color": orderItem.color }
          ],
        });

        if (stock.length <= 0) {
          isNotExistStock.push({ ...orderItem, error: "Stock is not available!" });
        } else if (stock[0].qty < orderItem.qty) {
          isNotExistQty.push({ ...orderItem, error: `${stock[0].qty} Quantity Is Available!!` });
        } else {
          orderItem.stock = stock[0]._id;
        }

        res(orderItem);
      })
    });

    const orderItems = await Promise.all(promiseArray);

    if (isNotExistStock.length > 0 || isNotExistQty.length > 0) {
      return { status: false, error: { isNotExistStock, isNotExistQty } };
    }
    data.orderItems = orderItems;
    data.shop = user.shop;

    const shopOrder = await ShopOrderModal.create(data);
    let shop = await ShopModal.findById(user.shop);

    // Emit the 'newOrder' event to notify the admin panel
    io.on("connection", (socket) => {
      console.log(`connect ${socket.id}`);
      
      socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
      });
    });
    io.emit('newOrder', { shopOrder });

    return { status: true, result: {shopOrder, shop} };

    
    // create dummy records
    // const stocks = await StockModal.find();

    // const startDate = new Date(2023, 3, 1);
    // const endDate = new Date(2023, 3, 18);

    // for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    //   const randomNumber = Math.floor(Math.random() * 71);
    //   const stock = stocks[randomNumber];

    //   const randomQty = Math.floor(Math.random() * 6 + 5) * 10;

    //   const data = {
    //     shop: "6439a26991982ec77dbc5576",
    //     orderItems: [
    //       {
    //         brand: {
    //           id: stock.brand.id,
    //           name: stock.brand.name
    //         },
    //         model: {
    //           id: stock.model.id,
    //           name: stock.model.name
    //         },
    //         category: {
    //           id: stock.category.id,
    //           name: stock.category.name
    //         },
    //         color: stock.color,
    //         qty: randomQty,
    //         price: stock.buyPrice,
    //         totalPrice: randomQty * stock.buyPrice,
    //         stock: stock._id
    //       }
    //     ],
    //     totalQty: randomQty,
    //     totalAmount: randomQty * stock.buyPrice,
    //     orderStatus: 'processing',
    //     orderDate: date
    //   }

    //   await ShopOrderModal.create(data);
    // }
  } catch (error) {
    return { status: false, code: 500, error: error.message };
  }
};

// Update shop order by manager
module.exports.updateShopOrder = async (id, data) => {
  try {
    let shopOrder = await ShopOrderModal.findById(id);
    if (!shopOrder) {
      return { status: false, error: "Shop Order Does Not Exist!!" };
    }


    if (shopOrder.orderStatus === "processing") {
      if (data.orderStatus === "completed") {
        return { status: false, error: "You can not complete this order before accepted!!" };
      }

      // Update order quantity if the orderStatus is processing otherwise not.
      if (data.orderItems) {
        shopOrderItemArray = shopOrder.orderItems;
        for (let i = 0; i < shopOrderItemArray.length; i++) {
          await updateOrderItemQty(shopOrderItemArray[i], data.orderItems[i]);
        }
      }
    }

    if (shopOrder.orderStatus === "accepted") {
      if (data.orderStatus === "processing" || data.orderStatus === "rejected") {
        return { status: false, error: "You can not update this order because order already accepted!!" };
      }
    }

    if (shopOrder.orderStatus === "rejected") {
      if (data.orderStatus === "processing" || data.orderStatus === "accepted" || data.orderStatus === "completed") {
        return { status: false, error: "You can not update this order because order already rejected!!" };
      }
    }

    if (shopOrder.orderStatus === "completed") {
      if (data.orderStatus === "processing" || data.orderStatus === "accepted" || data.orderStatus === "rejected") {
        return { status: false, error: "You can not update this order because order already completed!!" };
      }
    }

    shopOrder.orderStatus = data.orderStatus ? data.orderStatus : shopOrder.orderStatus;
    shopOrder.totalQty = data.totalQty;
    shopOrder.totalAmount = data.totalAmount;

    await shopOrder.save({ validateBeforeSave: false });

    // Update stock quantity in stock table if the orderStatus is completed.
    if (shopOrder.orderStatus === "completed") {
      shopOrder.orderItems.forEach(async (orderItem) => {
        const stock = await StockModal.findById(orderItem.stock);
        if (!stock) {
          return { status: false, error: "stock Does Not Exist!!" };
        }

        stock.qty -= orderItem.qty;

        await stock.save({ validateBeforeSave: false });
      });
    }

    return { status: true, result: shopOrder };

  } catch (error) {
    return { status: false, code: 500, error: error.message };
  }
};

// Delete shop order by manager
module.exports.deleteShopOrder = async (id) => {
  try {
    let shopOrder = await ShopOrderModal.findById(id);
    if (!shopOrder) {
      return { status: false, error: "Shop Order Does Not Exist!!" };
    }

    if (!(shopOrder.orderStatus === "processing")) {
      return { status: false, error: "You can not delete this order!!" };
    }

    shopOrder = await ShopOrderModal.findByIdAndDelete(id);

    return { status: true, result: shopOrder };
  } catch (error) {
    return { status: false, code: 500, error: error.message };
  }
};

async function updateOrderItemQty(orderItem, data) {
  // Find stock for each order item
  const stock = await StockModal.findById(orderItem.stock);

  if (data.qty) {
    // if (data.addQty || data.lessQty) {
    //   if (data.addQty) {
    //     if (stock.qty < data.addQty) {
    //       return { status: false, error: `${stock.qty} Quantity Is Available. You Can Add Maximum ${stock.qty} Quantity!!` };
    //     }
    //     orderItem.qty += data.addQty;
    //   }

    //   if (data.lessQty) {
    //     if (data.lessQty > data.quantity) {
    //       return { status: false, error: `${data.quantity} Quantity Is Available. You Can Less Maximum ${data.quantity} Quantity!!` };
    //     }
    //     orderItem.qty -= data.lessQty;
    //   }
    // }

    if (stock.qty < data.qty) {
      return { status: false, error: `${stock.qty} Quantity Is Available.` };
    }
    orderItem.qty = data.qty;
    orderItem.totalPrice = data.totalPrice;

    await orderItem.save({ validateBeforeSave: false, suppressWarning: true });
  }
}

// Get shop order item cost price (buying price) from stock model
module.exports.getShopOrderItemCost = async (data) => {
  try {
    const stock = await StockModal.find({
      $and: [
        { "brand.id": data.brand.id },
        { "model.id": data.model.id },
        { "category.id": data.category.id },
        { "color": data.color }
      ]
    });

    if (!stock.length) {
      return { status: false, error: "Stock Does Not Exist!!" };
    }

    data.price = stock[0].buyPrice;
    data.totalPrice = stock[0].buyPrice * parseInt(data.qty)

    return { status: true, result: data };
  } catch (error) {
    return { status: false, code: 500, error: error.message };
  }
};