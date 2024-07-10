const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
router.post('/login',UserController.loginUser)
router.post('/register',UserController.createUser)
router.put('/update/:id',UserController.updateUser)
router.delete('/delete/:id',UserController.deleteUser )
router.get('/alluser',UserController.getAllUser)
router.get('/detail/:id',UserController.getDetailUser)

module.exports = router