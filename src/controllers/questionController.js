const Question = require("../models/question");
const Message = require("../utils/message");

exports.createQuestion = (req, res) => {
    let body = req.body;
    
    console.log(body);

    if (body.question == null) {
        return res.status(400).json(Message("Os Dados não podem ser nulos!"));
    }

    Question.create({
        question: body.question,
    }).then(user => {
        return res.json(user);
    }).catch(err => {
        console.log(err);
    })

}

exports.getAllQuestions = (req, res) => {
    Question.findAll().then(user => {
        return res.json(user);
    }).catch(err => {
        console.log(err)
    })
}

exports.getQuestionById = (req, res) => {
    Question.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        return res.json(user);
    }).catch(err => {
        console.log(err)
    })
}

exports.updateQuestion = (req, res) => {

    let body = req.body;

    if (body.alternative == null || body.isRight == null) {
        return res.status(400).json(Message("Os Dados não podem ser nulos!"));
    }

    Question.update({
        question: body.question
    }, {
        where: {
            id: req.params.id
        }
    }).then(user => {
        return res.json(user);
    }).catch(err => {
        console.log(err)
    })
}

exports.deleteQuestionById = (req, res) => {
    Question.destroy({
        where: {
            id: req.params.id
        }
    }).then(alternative => {
        return res.json(alternative);
    }).catch(err => {
        console.log(err)
    })
}