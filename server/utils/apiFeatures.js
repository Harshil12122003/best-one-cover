const BrandModal = require("../models/product/brand");

class ApiFeatures {
    constructor(query, querystr, bodyData) {
        this.query = query;
        this.querystr = querystr;
        this.bodyData = bodyData;
    }

    search() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: "i",
            },

        } : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.querystr };
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((ele) => { delete queryCopy[ele] });

        // Filter For Price and Rating
        // let queryStr = JSON.stringify(queryCopy);
        // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        // this.query = this.query.find( JSON.parse(queryStr) );
        let data = {
            category: {
                $in: this.bodyData?.category ? this.bodyData?.category.map(function (opt) {
                    return new RegExp(opt, "i");
                }) : []
            },
            finalPrice: { $gte: this.bodyData?.price?.gte, $lte: this.bodyData?.price?.lte },
            color: { $in: this.bodyData?.color ? this.bodyData?.color.map(function (opt) {
                return new RegExp(opt, "i");
            }) : [] },
            model: { $eq: this.bodyData?.model ? this.bodyData?.model : [] },
            material: { $in: this.bodyData?.material ? this.bodyData?.material.map(function (opt) {
                return new RegExp(opt, "i");
            }) : [] },
        };
        (!this.bodyData?.category || this.bodyData?.category.length <= 0) && delete data.category;
        (!this.bodyData?.color || this.bodyData?.color.length <= 0) && delete data.color;
        (!this.bodyData?.model || this.bodyData?.model.length <= 0) && delete data.model;
        (!this.bodyData?.material || this.bodyData?.material.length <= 0) && delete data.material;
        (this.bodyData?.price?.gte === null  || this.bodyData?.price?.gte === undefined || this.bodyData?.price?.lte === null || this.bodyData?.price?.lte === undefined) && delete data.finalPrice;
        this.query = this.query.find(data);
        return this;
    }

    sort(){
        if (this.bodyData.sort === "ascending" || this.bodyData.sort === "descending") {
            this.query = this.query.find().sort({price: this.bodyData.sort === "ascending" ? 1 : -1})
        }else if(this.bodyData.sort === "Newest"){
            this.query = this.query.find().sort({createdAt: -1})
        }
        return this
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.querystr.page) || 1;

        // Skip the number of products
        const skipProduct = resultPerPage * (currentPage - 1);

        this.query.limit(resultPerPage).skip(skipProduct);
        return this
    }

    async brandModal() {
        const { bId, mId } = this.querystr;
        if (bId && mId) {
            let brand = await BrandModal.findById(bId);
            let model = brand.models.find((model) => {
                let modelId = model._id.valueOf()
                return modelId === mId && model;
            })

            var data = {brand : { $regex : brand.brand , $options : "i"}, model: { $regex : model.name , $options : "i"} }
        }
        this.query = this.query.find(data);
        return this
    }

}

module.exports = ApiFeatures;