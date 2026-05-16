const dotenv = require('dotenv');
dotenv.config();
const StockModal = require("../../models/product/stock");
const BrandModal = require("../../models/product/brand");
const CategoryModal = require("../../models/product/category");
const cloudinary = require("cloudinary");

// Get all stock   
module.exports.getStocks = async (req) => {
    try {
        const { keyword, brandId, modelId, categoryId } = req.query;

        const filter = { active: true };

        if (keyword) {
            filter.$or = [
                { "brand.name": { $regex: keyword, $options: 'i' } },
                { "model.name": { $regex: keyword, $options: 'i' } },
                { "category.name": { $regex: keyword, $options: 'i' } }
            ];
        }

        if (brandId) {
            filter["brand.id"] = brandId;
        }

        if (modelId) {
            filter["model.id"] = modelId;
        }

        if (categoryId) {
            filter["category.id"] = categoryId;
        }

        const stocks = await StockModal.find(filter).sort({createdAt: "-1"});
        if (!stocks) {
            return ({ status: false, error: "Stocks Does Not Exist!!" });
        }

        return ({ status: true, result: stocks });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get single stock details 
module.exports.getSingleStock = async (id) => {
    try {
        let stock = await StockModal.findById(id);
        if (!stock) {
            return ({ status: false, error: "Stock Does Not Exist!!" });
        }
        return ({ status: true, result: stock });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create stock by super admin   
module.exports.createStock = async (data) => {
    try {
        const brand = await BrandModal.findById(JSON.parse(data.brand).id);
        if (!brand) {
            return ({ status: false, error: "Brand Does Not Exist!!" });
        }

        const models = brand.models;
        const modelExist = models.some(model => model._id == JSON.parse(data.model).id);
        if (!modelExist) {
            return ({ status: false, error: "Model Does Not Exist!!" });
        }

        const category = await CategoryModal.findById(JSON.parse(data.category).id);
        if (!category) {
            return ({ status: false, error: "Category Does Not Exist!!" });
        }

        const stockExist = await StockModal.find({
            $and: [
                { "brand.id": JSON.parse(data.brand).id },
                { "model.id": JSON.parse(data.model).id },
                { "category.id": JSON.parse(data.category).id },
                { "color": data.color }
            ]
        });

        if (stockExist.length > 0) {
            return ({ status: false, error: "Stock Already Exist!!" });
        }

        let images = [];

        if (typeof data.images === "string") {
            images.push(data.images);
        } else {
            images = data.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        data.images = imagesLinks;
        data.brand = JSON.parse(data.brand);
        data.model = JSON.parse(data.model);
        data.category = JSON.parse(data.category);

        const stock = await StockModal.create(data);

        return ({ status: true, result: stock });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update stock by super admin
module.exports.updateStock = async (id, data) => {
    try {
        let stock = await StockModal.findById(id);
        if (!stock) {
            return ({ status: false, error: "Stock Does Not Exist!!" });
        }

        data.brand = JSON.parse(data.brand);
        data.model = JSON.parse(data.model);
        data.category = JSON.parse(data.category);
        const oldQty = stock.qty;
        // data.qty = oldQty > 0 ? (parseInt(oldQty) + parseInt(data.qty)) : parseInt(data.qty);
        data.qty = parseInt(data.qty)

        // if (typeof data.images === "string") {
        //     images.push(data.images);
        // } else {
        //     images = data.images;
        // }

        // if (images !== undefined) {
        //     // Deleting Images From Cloudinary
        //     for (let i = 0; i < 1; i++) {
        //         await cloudinary.v2.uploader.destroy(stock.images[i].public_id);
        //     }

        //     const imagesLinks = [];

        //     for (let i = 0; i < images.length; i++) {
        //         const result = await cloudinary.v2.uploader.upload(images[i], {
        //             folder: "products",
        //         });

        //         imagesLinks.push({
        //             public_id: result.public_id,
        //             url: result.secure_url,
        //         });
        //     }

        //     data.images = [...imagesLinks, ...stock.images.slice(1,)];
        // }

         // Images Start Here
         let images = [];
         data.images = JSON.parse(data.images)
         // if (typeof data.images === "string") {
         //     images.push(data.images);
         // } else {
         // }
         images = data.images;
 
         if (images !== undefined) {
             // Deleting Images From Cloudinary
             // for (let i = 0; i < product.images.length; i++) {
             //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
             // }
 
             const imagesLinks = [];
 
             for (let i = 0; i < images.length; i++) {
                 var result = images[i];
                 if (!images.public_id) {
                     result = await cloudinary.v2.uploader.upload(images[i].url, {
                         folder: "products",
                     });
                 }
 
                 imagesLinks.push({
                     public_id: result.public_id,
                     url: result.secure_url,
                 });
             }
 
             data.images = imagesLinks;
         }
 

        stock = await StockModal.findByIdAndUpdate(id, data, { new: true, runValidators: true, useFindAndModify: false });

        return ({ status: true, result: stock });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete stock by super admin   
module.exports.deleteStock = async (id) => {
    try {
        let stock = await StockModal.findById(id);
        if (!stock) {
            return ({ status: false, error: "Stock Does Not Exist!!" });
        }

        stock.active = false;
        await stock.save();

        return ({ status: true, result: stock });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}