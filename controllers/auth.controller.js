const httpStatusText =require("../utils/httpStatusText");
const asyncWrapper=require("../middlewares/asyncWrapper");
const User =require ("../models/users.model");
const appError=require("../utils/appError");
const bcrypt =require("bcrypt")
const generateJWT =require("../utils/generateJWT")


const register=asyncWrapper(async(req,res,next)=>{

    const {firstName,lastName,email,password,role}=req.body

    const oldUser=await User.findOne({email:email})
    if(oldUser){
        const error = appError.create("user already exists",400,httpStatusText.FAIL)
        return next(error)   
    }

    // password hashed
    const hashedPassword=await bcrypt.hash(password,10)

    const newUser= new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role
        })

    // generate jwt token
    const token =await generateJWT({email:newUser.email,id:newUser._id,role:newUser.role})
    newUser.token=token

    await newUser.save()
    
    return res.status(201).json({status:httpStatusText.SUCCESS,data:{user:newUser}})

})



const login=asyncWrapper(async(req,res,next)=>{
    const {email,password}=req.body;

    if (!email || !password) {
        const error = appError.create("Email and password are required", 400, httpStatusText.FAIL)
        return next(error)
    }

    const user=  await User.findOne({email:email})
    if (!user){
        const error =appError.create("user not found",400,httpStatusText.FAIL)
        return next(error)
    }
    // compare password
    const matchedPassword= await bcrypt.compare(password,user.password)

    if(user&&matchedPassword){
        // logged in  successfully
        const token=await generateJWT({email:user.email,id:user._id,role:user.role})
        
        return res.json({status:httpStatusText.SUCCESS,data:{token}})
    }else{
        const error =appError.create(" something wrong ",500,httpStatusText.FAIL)
        return next(error)
    }
})



module.exports={
    register,login
}