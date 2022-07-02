//Node Modules
const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    vote:{
        type:Number,
        required: true,
        default:0,
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
        required:true,
    },
    link_to_vote:{
        type:String
    }
})


const Option = mongoose.model('Option',optionSchema)


module.exports = Option