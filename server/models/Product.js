const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title: {
        type:String,
        required:true,
        unique:true
    },
    desc: { type: String, required: true},
    img:{
        type:String,
        required:true
    },
    categories:{
        type:Array
    },
    
    color:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    
},
    {timestamps:true}

)

module.exports=mongoose.model('products',ProductSchema)