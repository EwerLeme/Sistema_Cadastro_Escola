const Sequelize = require('sequelize');
const db = require('./db');

const Aluno = db.define('aluno', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    data_nascimento: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: { 
        type: Sequelize.STRING,
        allowNull: false,
    }
});

//Criar a tabela
Aluno.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
Aluno.sync({ alter: true })

module.exports = Aluno;