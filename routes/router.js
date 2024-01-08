const express = require('express')
const router = express.Router()

const{register,logIn,getAll,getUser,updateUser,deleteUser} = require('../controller/schoolController')
const {authenticate,role} = require('../middleware/authenthecation')
// const {role}=require('../middleware/authenthecation')yy

router.post('/reg',register)
router.post('/login',logIn)
router.get('/getall',authenticate, role, getAll)
router.put('/update/:id',authenticate,updateUser)
router.get('/getone/:id',authenticate,getUser)
router.delete('/delete/:id',authenticate,deleteUser)

module.exports = router