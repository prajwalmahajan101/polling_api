//Models
const Option = require("../models/option")
const Question = require("../models/question")

// Exports
exports.home= async(req,res)=>{
    let questions = await Question.find({}).select('-__v -vote').populate({
        path:'options',
        select:'-question -__v'
    })
    res.send(questions)
}
exports.error404=(req,res)=>{
    res.send({
        message:"404 Page not Found"
    })
}