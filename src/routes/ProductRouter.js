const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.post('/create',ProductController.createProduct)
router.put('/update/:id',ProductController.updateProduct)
router.delete('/delete/:id',ProductController.deleteProduct)
router.get('/all',ProductController.getAllProduct)
router.get('/detail/:id',ProductController.getDetailProduct)

module.exports = router