const jwt = require('jsonwebtoken');

require('dotenv').config();

const auth = (req, res, next) => {
    var token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({
            error: 'Sem Acesso, por favor converse com um administrador!'
        });
    }

    token = token.split(' ').pop();

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({
                error: 'Sem Acesso, por favor converse com um administrador!'
            });
        }
        console.log(decoded);
        next();
    });
}

module.exports = auth;