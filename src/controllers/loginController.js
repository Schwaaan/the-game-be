const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Message = require("../utils/message");

require('dotenv').config();

exports.login = (req, res) => {
    const body = req.body;

    if (body.login == null || body.password == null || body.login == "" || body.password == "") return res.status(422).json(Message("Login e senha são campos obrigatórios!"));

    User.findOne({
        where: {
            user: body.login
        }
    }).then(user => {
        if (user == null) {
            console.log("Usuário não encontrado.");
            return res.status(422).json(Message("Usuário ou senha incorretos."));
        }

        bcrypt.compare(body.password, user.password).then(result => {
            if (result) {
                const token = jwt.sign({
                    name: user.login
                }, process.env.SECRET);

                return res.json({
                    token: token,
                    id: user.id
                });
            } else {
                return res.status(422).json(Message("Usuário ou senha incorretos."));
            }
        })
    }).catch(err => {
        console.log('Error ao logar', err);
    });
};

exports.logout = (req, res) => {
    return res.json(Message("Usuário disconected"));
}