const mongoose = require("mongoose")
const scoreSchema= new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId, ref:"school App",
    },
    math:{ type: Number,
        default :0
    
},
english:{ type: Number,
    default :0
},
},{timestamps:true})

const scoreModel = mongoose.model('score',scoreSchema)
module.exports = scoreModel