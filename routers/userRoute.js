const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { checkAuthentication } = require('../middlewares/jwt_middleware');
const { isAdmin } = require('../middlewares/checkAdmin');

//routes for forget password
router.post('/forgot-password', userController.forgotPasswordController)

// protecting routes for admin
router.get('/admin-auth', checkAuthentication, isAdmin, (req, res) => {
    res.status(200).json({
        ok: true
    })
})
router.post('/register', userController.registerUser);
router.post('/sign-In', userController.signInUser);
// route for tensting authentication
router.get('/test', checkAuthentication, isAdmin, userController.testing);

// protected route for user
router.get('/user-auth', checkAuthentication, (req, res) => {
    res.status(200).json({
        ok: true
    })
})

module.exports = router;