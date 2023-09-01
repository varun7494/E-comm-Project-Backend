const express  =  require('express');
const router  =  express.Router()
const MyControllers =  require('../Controllers/Controllers')

router.get('/' , MyControllers.getApi )
router.post('/add-user' , MyControllers.RegisterUser)
router.post('/login-user' , MyControllers.loginUser)
router.post('/add-product' , MyControllers.addProduct)
router.get('/get-product' , MyControllers.getAllProducts)
router.post('/add-to-cart' , MyControllers.addToCart)
router.get('/get-cart-count' ,MyControllers.getCartCountByUserID)
router.get('/get-cart-with-products' ,MyControllers.getCartProducts)
router.post('/update-cart-quantity' ,MyControllers.updateCartQuantity)
router.post('/update-addresses' ,MyControllers.addAddress)
router.get('/get-user-addresses' ,MyControllers.getUserAddresses)


module.exports = router;