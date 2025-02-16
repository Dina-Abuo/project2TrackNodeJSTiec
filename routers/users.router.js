const express= require('express')
const userController =require("../controllers/user.controller");
const verifyToken =require("../middlewares/verifyToken")

const router =express.Router()

router.route('/').get(verifyToken,userController.getAllUsers)

// favorites
router.route('/favList').get(verifyToken, userController.getFavList);
router.route('/favList/:id').put(verifyToken, userController.toggleFavList);

// watchLater
router.route('/watchLater').get(verifyToken, userController.getWatchLater);
router.route('/watchLater/:id').put(verifyToken, userController.toggleWatchLater);






module.exports=router