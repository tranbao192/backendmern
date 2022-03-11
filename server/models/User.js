const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchame = new Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    email: {
         type: String, 
         required: true,         
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"customer"
    },
    fullname:{
        type:String,
    },
    address:{
        type:String,
    },
    phonenumber:{
        type:String
    }
    
},
    {timestamps:true}

)

module.exports=mongoose.model('users',UserSchame)