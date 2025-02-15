const express= require('express')
const userController =require("../controllers/user.controller");
const verifyToken =require("../middlewares/verifyToken")

const router =express.Router()

router.route('/').get(verifyToken,userController.getAllUsers)

module.exports=router