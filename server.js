require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const request = require('request');


const app = express();

const PORT = 8080;

app.use(cors());
app.options('*', cors()) // include before other routes

app.use(express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = require('./db/users');
let dados = require('./db/dados');
let products = require('./db/products');
let favoritos = require('./db/favoritos');

// SIGNIN
app.post("/signUp", (req, res) => {
    const username = req.body.username;
    if (!userExists(username)) {
        const newUser = {
            username: username,
            password: req.body.password,
            tipo: 0
        }
        if (newUser.password.length < 5) {
            return res.status(400).send({
                msg: 'Password should have 5 or more characters'
            });
        }
        users.push(newUser);
        writeToDB("./db/users.json", users);
        return res.status(201).send({
            msg: `User created ${username}`
        });
    } else {
        return res.status(409).send({
            msg: 'User already exists'
        });
    }
});

//Login

app.post("/login", (req, res) => {
    const nome = req.body.username;
    const senha = req.body.password;
    for (utilizador of users) {
        if (utilizador.username === nome)
            if (utilizador.password === senha) {
                token = jwt.sign(utilizador, process.env.SECRET);
                return res.status(201).json({ 
                    auth: true, 
                    token: token,
                msg: getFavoritos(utilizador.username) })
            } else {
                return res.status(401).json({ msg: "Invalid Password!" })
            }
    }
    return res.status(404).json({ msg: "User not found!" })
});

//

function writeToDB(fich, db) {
    fs.writeFile(fich, JSON.stringify(db, null, 4), 'utf8', err => {
        if (err) {
            console.log(`Error writing file: ${err}`)
        } else {
            console.log('Wrote on file ' + fich);  // Sucesso
        }
    })
}

function userExists(nome) {
    for (utilizador of users)
        if (utilizador.username === nome) {
            return true;
        }
    return false;
}

function validarToken(token) {
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (err) {
        return false;
    }
}
app.get("/products",(req, res) => {
    if (products) {
        res.status(200).json(products);
    } else {
        res.status(404).json({ msg: "the products weren't found" });
    }
});

// Acesso à informação somente se autorizado
app.get("/listarDados", (req, res) => {
    const decoded = validarToken(req.header('token'));
    if (!decoded) {
        return res.status(401).json({ msg: "Utilizador não autenticado ou não autorizado!" });
    }
    const nome = decoded.username;
    if (dados) {
        res.status(200).json(dados);
    } else {
        res.status(404).json({ msg: "Dados não encontrados!" });
    }
});

function getFavoritos(username) {
    let lista = "<h3>Favoritos do utilizador " + username + "</h3><br>";
    for (fav of favoritos){
        if (fav.Username === username){
            let id = fav.DadoId;
            for (dad of dados){
                if (dad.id === id){
                    lista += "Id: " + dad.id + " - Nome: " + dad.nome + "<br/>";
                    break;
                }
            }
        }
    }
    return lista;
}

 // Load the package
 const Calendarific = require('calendarific');

app.get('/calendar', (req, res) => {
     // Initlize with an API key
    const clapi = new Calendarific('deecbb17519de97a6ec9d3effe8c7fff2e094767');
    const parameters = {
    country: 'JP',
    year: parseInt(Math.floor(Math.random() * 40) + 1980),
    };

    clapi.holidays(parameters, function (data) {
        res.send(data)
    // Insert awesome code here...
    });
});


app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});



