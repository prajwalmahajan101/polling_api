//Models
const Question = require('../models/question')
const Option = require('../models/option')

// Exports
exports.create = async (req,res)=>{
    try{
        let question = await Question.create(req.body)
        res.status(201).send(question)
    }catch (err){
        res.status(500).send({
            message:"Error While creating the question"
        })
    }
}

exports.findById = async (req,res) =>{
    try {
        let id = req.params.id
        let question = await Question.findById(id).select('-__v -vote').populate({
            path: 'options',
            select: '-question -__v'
        })
        if (question) res.send(question)
        else res.status(404).send({
            message: "Requested Question id not Found"
        })
    }catch (err){
        res.status(500).send({
            message:"Error While finding the question form Db"
        })
    }

}


exports.deleteById = async (req,res,next) =>{
    try{
        let id = req.params.id
        let question =  await Question.findById(id)
        if(! question){
            return res.status(404).send({
                message:"Question can't be found!! Please Check question id"
            })
        }
        else if(question.vote!==0) {
            return res.status(400).send({
                message:"Can't delete the question!! One or More option have at least one vote"
            })
        }
        else{
            await Option.deleteMany({question:question._id})
            question.remove()
            res.status(200).send({
                message:"Question with it's options has been successfully deleted"
            })
        }

    }catch (e) {
        res.status(500).send({
            message:"Error While finding the question form Db"
        })
    }

}