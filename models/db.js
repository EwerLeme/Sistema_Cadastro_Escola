require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.BANCO_NOME, process.env.BANCO_USER, process.env.BANCO_SENHA, {
    host: process.env.BANCO_HOST,
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão com o banco de dados realizada com sucesso!");
}).catch(function(){
    console.log("Erro: Conexão com o banco de dados não realizada com sucesso!");
});

module.exports = sequelize;