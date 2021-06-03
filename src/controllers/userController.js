const User = require("../models/user");
const Message = require("../utils/message");
const bcrypt = require("bcrypt");
const { Sequelize, Op } = require("sequelize");

exports.create = (req, res) => {
    let body = req.body;

    if (body.name == null || body.user == null || body.password == null) {
        return res.status(400).json(Message("Os Dados não podem ser nulos!"));
    }

    // validação para permitir criar apenas um user
    User.findAndCountAll({
        where: {
            user: body.user
        }
    }).then(user => {
        console.log('count', user.count);
        if (user.count > 0) {
            return res.status(400).json(Message("Usuário já existe."));
        }

        // fazendo o hash da senha
        const salt = 10;
        bcrypt.hash(body.password, salt, (err, hash) => {
            if (err) {
                console.log('Error: erro ao cifrar a senha.', err);
            } else {
                console.log('hash', hash);

                // criando o usuário
                User.create({
                    name: body.name,
                    user: body.user,
                    password: hash
                }).then(user => {
                    return res.json(user);
                }).catch(err => {
                    console.log(err);
                })
            }
        });
    });
}

exports.getAll = (req, res) => {
    User.findAll().then(user => {
        return res.json(user);
    }).catch(err => {
        console.log(err)
    })
}

exports.getById = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        return res.json(user);
    }).catch(err => {
        console.log(err)
    })
}

exports.update = (req, res) => {

    let body = req.body;

    if (body.name == null || body.user == null || body.password == null) {
        return res.status(400).json(Message("Os Dados não podem ser nulos!"));
    }

    User.update({
        name: body.name,
        user: body.user,
        password: hashPassword(body.password)
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

exports.deleteById = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(user => {
        return res.json(user);
    }).catch(err => {
        console.log(err)
    })

}