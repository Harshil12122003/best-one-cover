const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
const OrderModal = require("../../models/order/order");
const ShopOrderModal = require("../../models/shop/shopOrder");
const ProductModal = require("../../models/product/product");
const CounterModal = require("../../models/shop/counter");
const ExpenseModal = require("../../models/shop/expense");
const paymentModal = require("../../models/Payment/payment");
const notificationModal = require("../../models/notification/notification");


// Get all order   
module.exports.getOrders = async (req) => {
    try {
        const { username, startDate, endDate, orderStatus, paymentStatus, paymentMethod } = req.query;

        const filter = {};
        if (username) {
            filter["shippingInfo.name"] = { $regex: username, $options: 'i' };
        }

        if (startDate && endDate) {
            filter.orderDate = { $gte: startDate, $lte: endDate };
        }   

        if (orderStatus) {
            filter.orderStatus = orderStatus;
        }

        if (paymentStatus) {
            filter["paymentInfo.status"] = paymentStatus;
        }

        if (paymentMethod) {
            filter.paymentMethod = paymentMethod;
        }

        const orders = await OrderModal.find(filter).sort({"orderDate": -1});

        if (!orders) {
            return ({ status: false, error: "Orders Does Not Exist!!" });
        }

        return ({ status: true, result: orders });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get all order   
module.exports.getMyOrders = async (user) => {
    try {
        let orders = await OrderModal.find({ userId: user.id }).sort({ "orderDate": -1 });
        if (!orders) {
            return ({ status: false, error: "Orders Does Not Exist!!" });
        }

        return ({ status: true, result: orders });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get single order details 
module.exports.getSingleOrder = async (id) => {
    try {
        let order = await OrderModal.findById(id);
        if (!order) {
            return ({ status: false, error: "Order Does Not Exist!!" });
        }
        return ({ status: true, result: order });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create order by user   
module.exports.createOrder = async (userId, data) => {
    try {
        data.userId = userId;
        data.orderDate = Date.now();

        const order = await OrderModal.create(data);

        const paymentData = {
            paymentId: data?.paymentInfo?.id,
            status: data?.paymentInfo?.status,
            amount: data?.totalPrice,
            orderId: order?._id,
            userId: userId,
            paymentDate: Date.now(),
        }
        const payment = await paymentModal.create(paymentData);

        return ({ status: true, result: order });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update order by user
module.exports.updateOrder = async (id, data) => {
    try {
        const order = await OrderModal.findById(id);
        if (!order) {
            return ({ status: false, error: "Order Does Not Exist!!" });
        }

        if (order.orderStatus === "pending") {
            if (data.orderStatus === "shipped" || data.orderStatus === "delivered") {
                return { status: false, error: `You can not ${data.orderStatus} this order before processing!!` };
            }
        }

        if (order.orderStatus === "processing") {
            if (data.orderStatus === "pending" || data.orderStatus === "cancelled") {
                return { status: false, error: "You can not update this order because order already in processing!!" };
            }

            if (data.orderStatus === "delivered") {
                return { status: false, error: `You can not ${data.orderStatus} this order before shipped!!` };
            }
        }

        if (order.orderStatus === "shipped") {
            if (data.orderStatus === "pending" || data.orderStatus === "processing" || data.orderStatus === "cancelled") {
                return { status: false, error: "You can not update this order because order already shipped!!" };
            }
        }

        if (order.orderStatus === "delivered") {
            if (data.orderStatus === "pending" || data.orderStatus === "processing" || order.orderStatus === "shipped" || data.orderStatus === "cancelled") {
                return { status: false, error: "You can not update this order because order already delivered!!" };
            }
        }

        order.orderStatus = data.orderStatus ? data.orderStatus : order.orderStatus;
        
        await order.save({ validateBeforeSave: false });

        // Update product quantity in product table if the orderStatus is delivered.
        if (order.orderStatus === "delivered") {
            order.shippingDate = Date.now();

            order.orderItems.forEach(async (orderItem) => {
                // Find product for each order item
                const product = await ProductModal.findById(orderItem.product);
                if (!product) {
                    return ({ status: false, error: "Product Does Not Exist!!" });
                }

                product.qty -= orderItem.quantity;

                await product.save({ validateBeforeSave: false });
            });
        }

        return ({ status: true, result: order });


        // Update dummy records
        // const startDate = new Date(2023, 0, 2);
        // const endDate = new Date(2023, 3, 16);

        // let skip = 0;

        // for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        //     const orders = await OrderModal.find().skip(skip).limit(10);

        //     orders.forEach(async (order) => {
        //         await OrderModal.findByIdAndUpdate(order.id, {
        //             orderDate: date
        //         });
        //     });

        //     skip += 10;
        // }

        // Update dummy records orderStatus
        // const startDate = new Date("2023-04-12T00:00:00.000Z");
        // const endDate = new Date("2023-04-12T23:59:59.999Z");

        // const orders = await OrderModal.find({
        //     orderDate: { $gte: startDate, $lte: endDate }
        // });

        // orders.forEach(async (order) => {
        //     await OrderModal.findByIdAndUpdate(order.id, {
        //         orderStatus: "delivered"
        //     });
        // });

        // return ({ status: true, result: orders });


    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete order by user   
module.exports.deleteOrder = async (id) => {
    try {
        let order = await OrderModal.findById(id);
        if (!order) {
            return ({ status: false, error: "Order Does Not Exist!!" });
        }

        order.orderStatus = "cancelled";
        order.save();

        return ({ status: true, result: order });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get sales by admin
module.exports.getSalesReport = async (req) => {
    try {
        const { startDate, endDate } = req.query;

        const orders = await OrderModal.aggregate([
            {
                $match: { 
                    orderStatus: "delivered",
                    orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
                    // orderDate: { $gte: new Date("2023-01-01"), $lte: new Date("2024-01-01") },
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
                    totalSalesAmount: { $sum: "$totalPrice" },
                    totalQty: { $sum: "$totalQty" },
                }
            },
            {
                $sort: { _id: -1 }
            },
        ]);

        if (!orders) {
            return ({ status: false, error: "Order Does Not Exist!!" });
        }

        return ({ status: true, result: orders });
    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
};

// Get profit by admin
module.exports.getProfitReport = async (req) => {
    try {
        const { startDate, endDate } = req.query;

        const orderPipeline = [
            {
                $match: { 
                    orderStatus: 'delivered',
                    orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
                }
            },
            {
                $unwind: '$orderItems'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'orderItems.product',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            },
            {
                $lookup: {
                    from: 'stocks',
                    localField: 'product.stock',
                    foreignField: '_id',
                    as: 'stock'
                }
            },
            {
                $unwind: '$stock'
            },
            {
                $group: {
                    _id: { $month: '$orderDate' },
                    totalProfit: {
                        $sum: {
                            $multiply: [
                                { $subtract: ['$orderItems.price', '$stock.buyPrice'] },
                                '$orderItems.quantity'
                            ]
                        }
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ];
        const orderProfit = await OrderModal.aggregate(orderPipeline);


        // Convert string (shopId) into objectId (shopId)
        const shopId =  mongoose.Types.ObjectId(req.query.shopId);

        // Shop order product cost
        const costPipeline = [
            {
                $match: { 
                    orderStatus: 'completed',
                    orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
                    $or: [
                        { shop: shopId },
                        { $expr: { $not: [ { $ifNull: [ req.query.shopId, false ] } ] } }
                    ]
                }
            },
            {
                $unwind: '$orderItems'
            },
            {
                $lookup: {
                    from: 'stocks',
                    localField: 'orderItems.stock',
                    foreignField: '_id',
                    as: 'stock'
                }
            },
            {
                $unwind: '$stock'
            },
            {
                $group: {
                    _id: { $month: '$orderDate' },
                    totalCost: {
                        $sum: {
                            $multiply: [ '$orderItems.qty', '$stock.buyPrice' ]
                        }
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]
        const cost = await ShopOrderModal.aggregate(costPipeline);
        
        const counter = await CounterModal.aggregate([
            {
                $match: {
                    counterDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
                    $or: [
                        { shop: shopId },
                        { $expr: { $not: [ { $ifNull: [ req.query.shopId, false ] } ] } }
                    ]
                }
            },
            {
                $group: {
                    _id: { $month: '$counterDate' },
                    totalCounter: {
                        $sum: '$totalAmount'
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const expense = await ExpenseModal.aggregate([
            {
                $match: {
                    expenseDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
                    $or: [
                        { shop: shopId },
                        { $expr: { $not: [ { $ifNull: [ req.query.shopId, false ] } ] } }
                    ]
                }
            },
            {
                $group: {
                    _id: { $month: '$expenseDate' },
                    totalExpense: {
                        $sum: '$totalAmount'
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Calculate shopOrder profit month wise
        const shopOrderProfit = counter.map((counter) => {
            const lessExpense = expense.find((expense) => {
                return expense._id === counter._id;
            });

            const lessCost = cost.find((cost) => {
                return cost._id === counter._id;
            });

            return {
                _id: counter._id,
                totalProfit: counter.totalCounter - (lessCost ? lessCost.totalCost : 0) - (lessExpense ? lessExpense.totalExpense : 0)
            }
        });

        // Calculate total profit (order + shopOrder) month wise
        const totalProfit = shopOrderProfit.map((shopOrderProfit) => {
            const addOrderProfit = orderProfit.find((orderProfit) => {
                return shopOrderProfit._id === orderProfit._id;
            });

            return {
                _id: shopOrderProfit._id,
                totalProfit: shopOrderProfit.totalProfit + (addOrderProfit ? addOrderProfit.totalProfit : 0)
            }
        })

        // const orders = await OrderModal.find().populate("orderItems.product", "stock");
        // if (!orders) {
        //     return { status: false, error: "Order Does Not Exist!!" };
        // }

        // let totalProfit = 0;
        // const promise = new Promise((resolve, reject) => {
        // Promise.all(orders.map(async (order) => {
        //     Promise.all(order.orderItems.map(async (orderItem) => {
        //         const product = await ProductModal.findById(orderItem.product).populate("stock", "buyPrice");
        //         const { price, quantity } = orderItem;
        //         const cost = product.stock.buyPrice * quantity;
        //         const revenue = price * quantity;
        //         const profit = revenue - cost;
        //         totalProfit += profit;
        //         }));
        //     }));
        //     resolve(totalProfit);
        // });

        // promise.then(
        //     function (value) { console.log(value) },
        //     function (error) { /* code if some error */ 
        // });

        return { status: true, result: { orderProfit, shopOrderProfit, totalProfit } };

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get all order   
module.exports.getNotifications = async (req) => {
    try {

        let {shop} = req.query
        let notifications = [];
        if (shop) {
            notifications = await notificationModal.find({stock: true}).sort({"createdAt": -1}).populate("stockId");
        }else{
            notifications = await notificationModal.find({stock: false}).sort({"createdAt": -1});
        }

        if (!notifications) {
            return ({ status: false, error: "Notifications Does Not Exist!!" });
        }

        return ({ status: true, result: notifications });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}