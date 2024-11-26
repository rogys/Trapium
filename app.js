const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const data = require('./user_modules/mysql');
let PORT = 3000;
app.use(session({
    secret: 'planomaterial',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        secure: false,
    }
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.get('/', (req, res) => {
    if(req.session.email) {
        const queryResults = `SELECT * FROM posts WHERE 1=1`;
        data.online.query(queryResults, (error, results) => {
            if(error) {
                console.log('Erro ao realizar consulta no banco!');
                return res.send('Erro ao consultar mensagens!');
            };
            return res.render('index', {user: req.session.email, data: results});
        });
    } else {
        return res.redirect('/login');
    };
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/', (req, res) => {
    const menssage = req.body.text;
    const textQuery = `INSERT INTO posts (email, text) VALUES (?, ?)`;
    data.online.query(textQuery, [req.session.email, menssage], (error, results) => {
        if(error) {
            console.log(error);
            return res.status(500).send('Erro ao inserir mensagem no banco!');
        } else {
            return res.redirect('/');
        };
    });
});
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});
app.post('/login', (req, res) => {
    if(req.session.email) {
        res.redirect('/');
    };
    let email = req.body.email;
    let password = req.body.password;
    const queryLogin = `SELECT * FROM users WHERE email = ? AND password = ?`;
    data.online.query(queryLogin, [email, password], (error, results) => {
        if(error) {
            res.send('Erro na consulta do banco!');
            return;
        };
        req.session.email = email;
        res.redirect('/');
    });
});
app.post('/signup', (req, res) => {
    if(req.session.email) {
        res.redirect('/');
    };
    let email = req.body.email;
    let password = req.body.password;
    const verifyEmail = `SELECT * FROM users WHERE email = ?`;
    data.online.query(verifyEmail, [email], (error, results) => {
        if(error) {
            return res.send('Erro ao consultar o banco!');
        } else if (results.length > 0) {
            return res.send('Esse email já foi cadastrado!');
        } else {
            const querySignup = `INSERT INTO users (email, password) VALUES (?, ?)`;
            data.online.query(querySignup, [email, password], (error, results) => {
                if(error) {
                    return res.send('Erro ao inserir os dados no banco!');
                };
                req.session.email = email;
                res.redirect('/');
            });
        }
    });
});
app.listen(PORT, error => {
    if (error) {
        console.log(`Erro ao estabelecer conexão! ${error}`);
        return;
    };
    console.log(`Conexão estabelecida na porta ${PORT}`);
});