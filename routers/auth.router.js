const express= require('express')
const authController =require("../controllers/auth.controller")


const router =express.Router()
router.route('/signIn').post(authController.login)
router.route('/signUp').post(authController.register)

module.exports=router