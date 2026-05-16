const dotenv = require('dotenv');
dotenv.config();
const ExpenseModal = require("../../models/shop/expense");

// Get all expense   
module.exports.getExpenses = async (req) => {
    try {
        const { shopId, expType, expMinAmount, expMaxAmount, minAmount, maxAmount, startDate, endDate } = req.query;

        const filter = {};
        if (shopId) {
            filter.shop = shopId;
        }

        if (expType) {
            filter["expense.type"] = expType;
        }

        if (expMinAmount && expMaxAmount) {
            filter["expense.amount"] = { $gte: expMinAmount, $lte: expMaxAmount };
        }

        if (minAmount && maxAmount) {
            filter.totalAmount = { $gte: minAmount, $lte: maxAmount };
        }

        if (startDate && endDate) {
            filter.expenseDate = { $gte: startDate, $lte: endDate };
        }

        let expenses = await ExpenseModal.find(filter).sort({"expenseDate": -1}).populate("shop");
        if (!expenses) {
            return ({ status: false, error: "Expenses Does Not Exist!!" });
        }

        return ({ status: true, result: expenses });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get all expense   
module.exports.getShopExpenses = async (id) => {
    try {
        let expenses = await ExpenseModal.find({shop: id}).sort({"expenseDate": -1});;
        if (!expenses) {
            return ({ status: false, error: "Expenses Does Not Exist!!" });
        }

        return ({ status: true, result: expenses });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get single expense details 
module.exports.getSingleExpense = async (id) => {
    try {
        let expense = await ExpenseModal.findById(id);
        if (!expense) {
            return ({ status: false, error: "Expense Does Not Exist!!" });
        }

        return ({ status: true, result: expense });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create expense by manager  
module.exports.createExpense = async (data, user) => {
    try {
        const shopExpenses = await ExpenseModal.find({
            $and: [
                { shop: user.shop },
                {
                    $or: [
                        { "expense.type": "shop rent" },
                        { "expense.type": "electricity bill" },
                        { "expense.type": "employee salary" }
                    ]
                }
            ]
        });

        let expenseData = data.expense.filter((expense) => {
            return ["shop rent", "electricity bill", "employee salary"].includes(expense.type);
        });

        if (shopExpenses && expenseData.length > 0) {
            const dataExpenseDate = new Date(data.expenseDate);
            const matchedExpenseArray = [];

            const existExpense = shopExpenses.filter((shopExpense) => {
                if (shopExpense.expenseDate.getFullYear() === dataExpenseDate.getFullYear() &&
                    shopExpense.expenseDate.getMonth() === dataExpenseDate.getMonth()) {
                        shopExpense.expense.filter((expense) => {
                            const matchedExpenses = expenseData.filter((dataExpense) => {
                                return dataExpense.type === expense.type
                            });

                            matchedExpenseArray.push(...matchedExpenses);
                        });
                        // return shopExpense;
                }
            });

            if (matchedExpenseArray.length > 0) {
                return ({ status: false, error: "This Type Of Expense Is Already Added!!" });
            }
        }
        data.shop = user.shop;

        const expense = await ExpenseModal.create(data);

        return ({ status: true, result: expense });

        // create dummy records
        // const date = new Date(2023, 1, 10);

        // const data = {
        //     shop: "643994bc91982ec77dbbe172",
        //     expense: [
        //         {
        //             type: "light reparing",
        //             amount: 4500
        //         }
        //     ],
        //     totalAmount: 4500,
        //     expenseDate: date
        // }

        // await ExpenseModal.create(data);
    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update expense by manager
module.exports.updateExpense = async (id, data) => {
    try {
        let expense = await ExpenseModal.findById(id);
        if (!expense) {
            return ({ status: false, error: "Expense Does Not Exist!!" });
        }

        expense = await ExpenseModal.findByIdAndUpdate(id, data, { new: true, runValidators: true, useFindAndModify: false });

        return ({ status: true, result: expense });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}