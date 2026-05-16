const express = require("express");
const productHandler = require("../../handler/ProductHandler/productHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.post('/products',productHandler.getProducts);
router.get('/product/:id',productHandler.getSingleProduct);
router.post('/product/new',authUser, productHandler.createProduct);
router.put('/product/:id',authUser, productHandler.updateProduct);
router.delete('/product/:id',authUser, productHandler.deleteProduct);

// For brans and modal
router.get('/brands', productHandler.getBrands);
router.post('/brand/new',authUser, productHandler.createBrand);
router.post('/brand/model/new',authUser, productHandler.createModel);
router.get('/brand/:id',authUser, productHandler.getSingleBrand);
router.put('/brand/model',authUser, productHandler.updateModel);
router.put('/brand/:id',authUser, productHandler.updateBrand);
router.delete('/brand/model',authUser, productHandler.deleteModel);
router.delete('/brand/:id',authUser, productHandler.deleteBrand);

module.exports = router;