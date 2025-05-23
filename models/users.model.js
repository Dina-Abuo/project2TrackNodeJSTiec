const mongoose =require("mongoose")
const validator =require("validator")
const userRoles = require("../utils/userRoles")
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'failed must be a valid email address']
    },
    password:{
        type:String,
        required:true
    }, 
    token:{
        type:String
    },
    role:{
        type:String,
        enum:[userRoles.USER,userRoles.ADMIN],
        default:userRoles.USER
    },
    favList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    watchLater: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
},
{
    timestamps: true
})
module.exports=mongoose.model('User',userSchema)