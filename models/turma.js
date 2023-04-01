const Sequelize = require('sequelize');
const db = require('./db');

const Turma = db.define('turma', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ano: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    vagas: { 
        type: Sequelize.STRING,
        allowNull: false,
    }
});

//Criar a tabela
Turma.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
Turma.sync({ alter: true })

module.exports = Turma;