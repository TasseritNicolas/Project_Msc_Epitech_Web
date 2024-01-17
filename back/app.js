const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { Sequelize } = require('sequelize');
const userroute = require('./route/user');


const app = express();


const sequelize = new Sequelize("myjob", "root", "", {
  dialect: "mysql",
    host: 'localhost',
    port: 3306
});
try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/', function(req, res) {
    res.status(200).send('<h1>Request</h1>');
});
app.use('/api/user', userroute);


module.exports = app;
