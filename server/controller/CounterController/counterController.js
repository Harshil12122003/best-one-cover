const dotenv = require('dotenv');
dotenv.config();
const CounterModal = require("../../models/shop/counter");

// Get all counter   
module.exports.getCounters = async (req) => {
    try {
        const { shopId, minAmount, maxAmount, startDate, endDate } = req.query;

        const filter = {};
        if (shopId) {
            filter.shop = shopId;
        }

        if (minAmount && maxAmount) {
            filter.totalAmount = { $gte: minAmount, $lte: maxAmount };
        }

        if (startDate && endDate) {
            filter.counterDate = { $gte: startDate, $lte: endDate };
        }

        let counters = await CounterModal.find(filter).sort({"counterDate": -1}).populate("shop");
       
        if (!counters) {
            return ({ status: false, error: "Counters Does Not Exist!!" });
        }

        return ({ status: true, result: counters });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get single counter details 
module.exports.getShopCounters = async (id) => {
    try {
        let counter = await CounterModal.find({shop: id}).sort({"counterDate": -1});;
        if (!counter) {
            return ({ status: false, error: "Counter Does Not Exist!!" });
        }

        return ({ status: true, result: counter });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get single counter details 
module.exports.getSingleCounter = async (id) => {
    try {
        let counter = await CounterModal.findById(id);
        if (!counter) {
            return ({ status: false, error: "Counter Does Not Exist!!" });
        }

        return ({ status: true, result: counter });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create counter by manager  
module.exports.createCounter = async (data, user) => {
    try {
        const shopCounters = await CounterModal.find({ shop: user.shop });

        if (shopCounters) {
            const counterDate = new Date(data.counterDate);

            const existCounter = shopCounters.find((counter) => {
                if (counterDate.getFullYear() === counter.counterDate.getFullYear() &&
                    counterDate.getMonth() === counter.counterDate.getMonth() &&
                    counterDate.getDate() === counter.counterDate.getDate()) {
                        return counter;
                }
            });

            if (existCounter) {
                return ({ status: false, error: "Today Counter Is Already Added!!" });
            }
        }
        data.shop = user.shop; 

        const counter = await CounterModal.create(data);

        return ({ status: true, result: counter });


        // create dummy records
        // const startDate = new Date(2023, 0, 1);
        // const endDate = new Date(2023, 3, 18);

        // for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        //     const amount = Math.floor(Math.random() * 31 + 25) * 1000;

        //     const data = {
        //         shop: "6439a26991982ec77dbc5576",
        //         totalAmount: amount,
        //         counterDate: date
        //     }

        //     await CounterModal.create(data);
        // }
    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update counter by manager
module.exports.updateCounter = async (id, data) => {
    try {
        let counter = await CounterModal.findById(id);
        if (!counter) {
            return ({ status: false, error: "Counter Does Not Exist!!" });
        }

        counter = await CounterModal.findByIdAndUpdate(id, data, { new: true, runValidators: true, useFindAndModify: false });

        return ({ status: true, result: counter });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}