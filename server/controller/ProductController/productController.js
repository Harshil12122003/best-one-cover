const dotenv = require('dotenv');
dotenv.config();
const ProductModal = require("../../models/product/product");
const BrandModal = require("../../models/product/brand");
const StockModal = require("../../models/product/stock");
const ApiFeatures = require("../../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Get all product   
module.exports.getProducts = async (req) => {
    try {
        let resultPerPage = 100;
        if (req.query.page) {
            resultPerPage = 20;
        }
        const productsCount = await ProductModal.countDocuments();
        const { bId, mId } = req.query;
        if (bId && mId) {
            let brand = await BrandModal.findById(bId);
            let model = brand.models.find((model) => {
                let modelId = model._id.valueOf()
                return modelId === mId && model;
            })

            var data = { brand: { $regex: brand.brand, $options: "i" }, model: { $eq: model.name} }
        }

        // This create new object of ApiFeatures and call constructer return this
        const apiFeature = new ApiFeatures(ProductModal.find(data && data), req.query, req.body).search().filter().sort();
        console.log("apiFeature***",apiFeature);
        // let products = await apiFeature.query;

        // let filteredProductsCount = products.length;
        // const productsCounter = await apiFeature.query
        // console.log("productsCounter==",productsCounter);
        apiFeature.pagination(resultPerPage);
        // apiFeature.brandModal();
        const products = await apiFeature.query; // Is similer to Product.find
        // console.log("products===", products);
        if (!products) {
            return ({ status: false, error: "Product Does Not Exist!!" });
        }

        return ({ status: true, result: products });

    } catch (error) {
        return { status: false, code: 500, error: "Internal server error", message: error.message };
    }
}

// Get single product details 
module.exports.getSingleProduct = async (id) => {
    try {
        let product = await ProductModal.findById(id);
        if (!product) {
            return ({ status: false, error: "Product Does Not Exist!!" });
        }

        return ({ status: true, result: product });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create product by admin   
module.exports.createProduct = async (data) => {
    try {
        // Find product stock
        const stock = await StockModal.find({
            $and: [
                { "brand.id": JSON.parse(data.brand).id },
                { "model.id": JSON.parse(data.model).id },
                { "category.id": JSON.parse(data.category).id },
                { "color": data.color }
            ]
        });

        if (!stock.length) {
            return ({ status: false, error: "Stock Is Not Available!!" });
        }

        if (stock[0].qty < data.qty) {
            return ({ status: false, error: `${stock[0].qty} Quantity Is Available!!` });
        }

        // Update stock quantity in stock table after the product has been added.
        stock[0].qty = stock[0].qty - data.qty;

        data.brand = JSON.parse(data.brand).name;
        data.model = JSON.parse(data.model).name;
        data.category = JSON.parse(data.category).name;
        data.discount = JSON.parse(data.discount);
        data.stock = stock[0]._id;

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

        const product = await ProductModal.create(data);

        await stock[0].save();

        return ({ status: true, result: product });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update product by admin
module.exports.updateProduct = async (id, data) => {
    try {
        let product = await ProductModal.findById(id);
        if (!product) {
            return ({ status: false, error: "Product Does Not Exist!!" });
        }

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

        // Find product stock
        const stock = await StockModal.findById(product.stock);
        if (!stock) {
            return ({ status: false, error: "Stock Does Not Exist!!" });
        }

        // Update stock quantity in stock table after the product has been updated.
        if (data.qty > product.qty) {
            const lessQty = data.qty - product.qty;
            if (data.qty > stock.qty) {
                return ({ status: false, error: `${stock.qty} Quantity Is Available. You Can Add Maximum ${stock.qty} Quantity!!` });
            }
            product.qty += lessQty;
            stock.qty -= lessQty;
        } else {
            const addQty = product.qty - data.qty;
            if (data.qty > product.qty) {
                return ({ status: false, error: `${product.qty} Product Is Available. You Can Less Maximum ${product.qty} Quantity!!` });
            }
            product.qty -= addQty;
            stock.qty += addQty;
        }

        product = await ProductModal.findByIdAndUpdate(id, data, { new: true, runValidators: true, useFindAndModify: false });

        await stock.save();

        return ({ status: true, result: product });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete product by admin   
module.exports.deleteProduct = async (id) => {
    try {
        let product = await ProductModal.findById(id);
        if (!product) {
            return ({ status: false, error: "Product Does Not Exist!!" });
        }

        // // Deleting Images From Cloudinary
        // for (let i = 0; i < product.images.length; i++) {
        //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        // }

        product.active = false;
        await product.save();

        // Find product stock
        let stock = await StockModal.findById(product.stock);
        if (!stock) {
            return ({ status: false, error: "Stock Does Not Exist!!" });
        }

        // Update stock quantity in stock table after the product has been deleted.
        stock.qty += product.qty;
        await stock.save();

        return ({ status: true, result: product });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get all brand and modal 
module.exports.getBrands = async () => {
    try {
        const filter = { active: true };

        let brands = await BrandModal.find(filter);
        console.log("brands",brands.models);
        const models = brands.models && brands.models.length > 0 && brands.models.map((model) => {
            return model.active === true;
        });

        brands.models = models && models.length < 0 ? models : [];

        if (!brands) {
            return ({ status: false, error: "Brands Does Not Exist!!" });
        }
        return ({ status: true, result: brands });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create brand and modal by admin   
module.exports.createBrand = async (data) => {
    try {
        const response = await BrandModal.find({ brand: { $regex: data.brand, $options: "i" } });

        if (response.length > 0) {
            return ({ status: false, error: "Brand Already Exist!" });
        }

        const dataObj = {
            brand: data.brand,
            models: data.model ? [{ name: data.model }] : []
        };

        const brand = await BrandModal.create(dataObj);

        return ({ status: true, result: brand });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Create brand and modal by admin   
module.exports.createModel = async (data) => {
    try {
        const isExist = await BrandModal.find({
            $and: [
                { brand: { $regex: data.brand, $options: "i" } },
                { "models.name": { $in: [data.model] } }
            ]
        });

        // const data = await BrandModal.find();
        // // { brand: { $regex: data.brand, $options: "i" } }

        if (isExist.length > 0) {
            return ({ status: false, error: "Brand and model Already Exist!" });
        }

        const response = await BrandModal.find({ brand: { $regex: data.brand, $options: "i" } });

        const dataObj = {
            brand: data.brand,
            models: data.model ? [{ name: data.model }] : []
        };

        let brand = null;
        if (response.length > 0) {
            const modelData = response[0].models.length > 0 && response[0].models.find((model) => {
                return model.name.toLowerCase() === data.model.toLowerCase()
            })

            if (modelData) {
                return ({ status: false, error: "Model Already Exist!" });
            }

            dataObj.models = [...response[0].models, ...dataObj.models]
            brand = await BrandModal.findByIdAndUpdate(response[0]._id, dataObj, { new: true, runValidators: true, useFindAndModify: false });

        } else {
            brand = await BrandModal.create(dataObj);
        }

        return ({ status: true, result: brand });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get single brand and modal 
module.exports.getSingleBrand = async (id) => {
    try {
        let brand = await BrandModal.findById(id);
        if (!brand) {
            return ({ status: false, error: "Brands Does Not Exist!!" });
        }

        return ({ status: true, result: brand });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update brand
module.exports.updateBrand = async (id, data) => {
    try {
        let brand = await BrandModal.findById(id);
        if (!brand) {
            return ({ status: false, error: "Brands Does Not Exist!!" });
        }

        brand = await BrandModal.findByIdAndUpdate(id, data, { new: true, runValidators: true, useFindAndModify: false });

        return ({ status: true, result: brand });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update model
module.exports.updateModel = async (req) => {
    try {
        const data = req.body;
        const { brandId, modelId } = req.query;

        let brand = await BrandModal.findById(brandId);

        const models = brand.models.map((model) => {
            if (model._id == modelId) {
                model.name = data.name;
            }
            return model;
        });

        brand.models = models;

        brand = await BrandModal.findByIdAndUpdate(brandId, brand, { new: true, runValidators: true, useFindAndModify: false });

        return ({ status: true, result: brand });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete brand
module.exports.deleteBrand = async (id) => {
    try {
        let brand = await BrandModal.findById(id);
        if (!brand) {
            return ({ status: false, error: "Brands Does Not Exist!!" });
        }

        brand.active = false;
        await brand.save();

        return ({ status: true, result: brand });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete model
module.exports.deleteModel = async (req) => {
    try {
        const { brandId, modelId } = req.query;

        let brand = await BrandModal.findById(brandId);

        // const models = brand.models.filter((model) => {
        //     return model._id != modelId;
        // });

        const models = brand.models.map((model) => {
            if (model._id == modelId) {
                model.active = false;
            }
            return model;
        });

        brand.models = models;

        brand = await BrandModal.findByIdAndUpdate(brandId, brand, { new: true, runValidators: true, useFindAndModify: false });

        return ({ status: true, result: brand });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}