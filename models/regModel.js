const mongoose = require('mongoose')

const regSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    isLoggedIn:{
        type:Boolean,
        default:false
    },

    isAdmin:{
        type:Boolean,
        default:false
    },

    role:{
        type:String,
        enum:['Teacher','Student'],
        required:true
    }
},{timestamps:true})

const regModel = mongoose.model('school App',regSchema)
module.exports =regModel