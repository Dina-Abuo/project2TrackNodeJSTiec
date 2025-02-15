const httpStatusText =require("../utils/httpStatusText");
const asyncWrapper=require("../middlewares/asyncWrapper");
const User =require ("../models/users.model");




const getAllUsers=asyncWrapper(async(req,res)=>{
    
    const query= req.query;
    const limit = query.limit||10;
    const page = query.page||1;  
    const skip = (page-1)*limit;
    
    const users = await User.find({}, { __v: 0, password: 0 }).sort({ createdAt: -1 }).limit(limit).skip(skip);

    return res.json({status:httpStatusText.SUCCESS,data:{users}})

})


module.exports={
getAllUsers
}