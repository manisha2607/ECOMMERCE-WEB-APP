const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const { checkAuthentication } = require('../middlewares/jwt_middleware');
const { isAdmin } = require('../middlewares/checkAdmin');
const { createProduct, getProduct, getSingleProduct, getPhoto, deleteProduct, updateProduct } = require('../controllers/productController');

router.post('/create-product', checkAuthentication, isAdmin, formidable(), createProduct)
router.get('/get-products', getProduct)
router.get('/get-product/:slug', getSingleProduct)
router.get('/get-photo/:id', getPhoto)
router.delete('/delete-product/:id', checkAuthentication, isAdmin, deleteProduct)
router.put('/update-product/:id', checkAuthentication, isAdmin, formidable(), updateProduct)



module.exports = router;