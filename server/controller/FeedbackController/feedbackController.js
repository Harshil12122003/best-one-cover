const dotenv = require('dotenv');
dotenv.config();
const FeedbackModal = require("../../models/product/feedback");
const OrderModal = require("../../models/order/order");

// Get all feedback   
module.exports.getFeedbacks = async (id) => {
    try {
        const feedbacks = await FeedbackModal.find({user: id}).populate("product");
        if (!feedbacks) {
            return ({ status: false, error: "Feedbacks Does Not Exist!!" });
        }

        return ({ status: true, result: feedbacks });   

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get single feedback details
module.exports.getSingleFeedback = async (id) => {
    try {
        const feedback = await FeedbackModal.find({product: id}).populate("user");
        if (feedback.length <= 0) {
            return ({ status: false, error: "Feedback Does Not Exist!!" });
        }
        return ({ status: true, result: feedback });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create feedback   
module.exports.createFeedback = async (userId, data) => {
    try {
        const product = await ProductModal.findById(data.product);
        if (!product) {
            return ({ status: false, error: "Product Does Not Exist!!" });
        }
        data.user = userId;

        const feedback = await FeedbackModal.create(data);
        feedback.product = product;

        return ({ status: true, result: feedback });


        // Create dummy records
        // const orders = await OrderModal.find();

        // const ratingReviewArr = [
        //     {
        //         rating: 1,
        //         review: "I was extremely disappointed with this mobile cover. The quality was poor, and it did not fit my phone properly. It also looked nothing like the picture advertised. I would not recommend this product to anyone."
        //     },
        //     {
        //         rating: 2,
        //         review: "This mobile cover is okay, but nothing special. It fits my phone well, but the design is a bit plain and boring. The material feels cheap and flimsy, and I'm not sure how well it will hold up over time. I wouldn't necessarily recommend this product, but it could be a decent option if you're on a tight budget."
        //     },
        //     {
        //         rating: 3,
        //         review: "This mobile cover is decent overall. It fits my phone well and provides some basic protection from scratches and minor drops. However, the design is not very exciting, and the material is a bit slippery in my hand. It's an okay option if you're looking for a basic, functional mobile cover, but there are probably better ones out there if you're willing to spend a bit more."
        //     },
        //     {
        //         rating: 4,
        //         review: "I really like this mobile cover! It fits my phone perfectly and provides great protection without adding too much bulk. The design is stylish and eye-catching, and the material feels durable and high-quality. The only reason I didn't give it a five-star rating is because it's a bit pricey compared to other options on the market. Overall, I would definitely recommend this product to anyone looking for a stylish and functional mobile cover."
        //     },
        //     {
        //         rating: 5,
        //         review: "I absolutely love this mobile cover! It fits my phone like a glove and provides excellent protection without sacrificing style. The design is beautiful and unique, and the material feels incredibly high-quality and durable. I've dropped my phone a few times since getting this cover, and it has protected it perfectly each time. I would highly recommend this product to anyone looking for a top-notch mobile cover!"
        //     },
        // ];

        // orders.forEach(async (order) => {
        //     const randomNumber = Math.floor(Math.random() * 5);

        //     const ratingReview = ratingReviewArr[randomNumber];

        //     const data = {
        //         user: order.userId,
        //         product: order.orderItems[0].product,
        //         rating: ratingReview.rating,
        //         review: ratingReview.review
        //     }

        //     await FeedbackModal.create(data);
        // });
        
        // return ({ status: true, result: orders });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update feedback
module.exports.updateFeedback = async (id, data) => {
    try {
        let feedback = await FeedbackModal.findById(id);
        if (!feedback) {
            return ({ status: false, error: "Feedback Does Not Exist!!" });
        }

        feedback = await FeedbackModal.findByIdAndUpdate(id, data, { new: true, runValidators: true, useFindAndModify: false });

        return ({ status: true, result: feedback });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete feedback  
module.exports.deleteFeedback = async (id) => {
    try {
        let feedback = await FeedbackModal.findById(id);
        if (!feedback) {
            return ({ status: false, error: "Feedback Does Not Exist!!" });
        }

        feedback = await FeedbackModal.findByIdAndDelete(id);

        return ({ status: true, result: feedback });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}