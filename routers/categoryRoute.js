const express = require('express');
const { checkAuthentication } = require('../middlewares/jwt_middleware');
const { isAdmin } = require('../middlewares/checkAdmin');
const { createCategory, categoryUpdate, getCategory, getSingleCategory, deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

// route for create category
router.post('/create-category', checkAuthentication, isAdmin, createCategory)
router.put('/update-category/:id', checkAuthentication, isAdmin, categoryUpdate)
router.get('/get-category', getCategory)
router.get('/get-singlecategory/:id', getSingleCategory)
router.delete('/delete-category/:id', checkAuthentication, isAdmin, deleteCategory)

module.exports = router;