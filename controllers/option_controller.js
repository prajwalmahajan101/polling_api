let host = process.env.Host || 'http://localhost:8080'

//Models
const Option = require("../models/option")
const Question = require("../models/question")
// Exports

exports.create = async (req,res)=>{
    try{
        let id = req.params.id
        let question = await Question.findById(id)
        req.body['question'] = question._id
        let option = await Option.create(req.body)
        option.link_to_vote = host+'/options/'+option.id+'/add-vote'
        option.save()
        question.options.push(option._id)
        question.save()
        res.status(201).send(option)
    }catch (err){
        res.status(500).send({
            message:"Error While creating the option"
        })
    }
}

exports.addVote = async (req,res) =>{
    try {
        let id = req.params.id
        let option = await Option.findById(id)
        if (!option) {
            return res.status(404).send({
                message: "Can't Find the option Requested For"
            })
        }
        let question_id = option.question
        let question = await Question.findById(question_id)
        option.vote++
        question.vote++
        option.save()
        question.save()
        res.send({
            message: "Vote Added Successfully"
        })
    }catch (err){
        res.status(500).send({
            message:"Error While casting the vote"
        })
    }
}


exports.deleteById = async (req,res)=>{
    try{
        let id = req.params.id
        let option = await Option.findById(id)
        if(! option){
            res.status(404).send({
                message:"Option Can't Be found!!!"
            })
        }else if(option.vote!==0){
            res.status(400).send({
                message:"Option has at least one vote!! It can't be deleted!!"
            })
        }
        else{
            option.remove()
            res.status(200).send({
                message:"Option successfully deleted"
            })
        }
    }catch (err){
        res.status(500).send({
            message:"Error While searching the option"
        })
    }

}