const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController');
router.post('/create', OrderController.createOrder)
router.get('/allOrder/:id',OrderController.getAllOrderDetails)
router.get('/detail/:id', OrderController.getDetailsOrder)
// router.delete('/cancelOrder/:id', OrderController.cancelOrderDetails)
router.get('/all', OrderController.getAllOrder)
module.exports=router