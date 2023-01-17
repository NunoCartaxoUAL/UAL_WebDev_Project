require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const request = require('request');
const path = require('path');
const https = require('https');

const app = express();

const PORT = 8080;

app.use(cors());
app.options('*', cors()) // include before other routes

app.use(express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = require('./db/users');
let products = require('./db/products');
let favoritos = require('./db/favoritos');

// SIGNIN
app.post("/signUp", (req, res) => {
    const username = req.body.username;
    if (!userExists(username)) {
        const newUser = {
            username: username,
            password: req.body.password,
            type: req.body.type
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
app.post("/registerProd", (req, res) => {
    newid = products[products.length-1].id+1
    const newProd = {
        id: newid,
        name: req.body.name,
        image: req.body.image,
        type: req.body.type,
        price:req.body.price
    };

    products.push(newProd);
    writeToDB("./db/products.json", products);
    return res.status(201).send({
        msg: `prod created ${newProd.name}`
    });
    
});
app.delete("/deleteProd/:name", (req, res) => {
    const name= req.params.name;
    let dbAux = [];
    for (prod of products){
        if (prod.name == name) {
            result=prod;
        }else{
            dbAux.push(prod);
        }
    }
    products = [];
    for (let i = 0; i < dbAux.length; i++) {
        products.push(dbAux[i]); // copia os dados
    }
    writeToDB("./db/products.json", products);
    return res.status(201).send({
        msg: `prod deleted`
    });
    
});

app.delete("/removeUser/:username", (req, res) => {
    const username = req.params.username;
    if (userExists(username)) {

        let dbAux = [];
        for (user of users){
            if (user.username == username) {
                result=user;
            }else{
                dbAux.push(user);
            }
        }

        users = [];
        for (let i = 0; i < dbAux.length; i++) {
            users.push(dbAux[i]); // copia os dados
        }
        writeToDB("./db/users.json", users);
        return res.status(201).send({
            msg: `User deleted ${username}`
        });
    } else {
        return res.status(409).send({
            msg: 'User doesnt exist'
        });
    }
});

//Login

app.post("/login", (req, res) => {
    const nome = req.body.username;
    const senha = req.body.password;
    for (user of users) {
        if (user.username === nome)
            if (user.password === senha) {
                token = jwt.sign(user, process.env.SECRET);
                return res.status(201).json({ 
                    auth: true, 
                    token: token,
                    msg: getFavoritos(user.username),
                    type: user.type })
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
    for (user of users)
        if (user.username === nome) {
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

app.get("/listUsers",(req, res) => {
    if (products) {
        res.status(200).json(users);
    } else {
        res.status(404).json({ msg: "the products weren't found" });
    }
});

// Acesso à informação somente se autorizado
app.get("/listarDados", (req, res) => {
    const decoded = validarToken(req.header('token'));
    if (!decoded) {
        return res.status(401).json({ msg: "user não autenticado ou não autorizado!" });
    }
    const nome = decoded.username;
    if (dados) {
        res.status(200).json(dados);
    } else {
        res.status(404).json({ msg: "Dados não encontrados!" });
    }
});

function getFavoritos(username) {
    return ""
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
    });
});
app.get('/admin',(req,res)=>{
    return res.redirect('/admin.html');
})
app.get('/public',(req,res)=>{
    return res.redirect('/index.html');
})
const sslServer = https.createServer({
    key: fs.readFileSync('cert/key.pem'),
    cert:fs.readFileSync('cert/certificate.pem')
  }, app)

sslServer.listen(8080, () => console.log("Secure server on port 8080"))
app.use(express.static('public'));




