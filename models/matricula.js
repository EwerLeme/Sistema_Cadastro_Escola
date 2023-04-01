const Sequelize = require('sequelize');
const db = require('./db');
const Aluno = require('./aluno')
const Turma = require('./turma')

const Matricula = db.define('matricula', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_aluno: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_turma: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    data_matricula: { 
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Matricula.belongsTo(Aluno, {foreignKey: 'id_aluno', allowNull: false})
Matricula.belongsTo(Turma, {foreignKey: 'id_turma', allowNull: false})


//Criar a tabela
Matricula.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
Matricula.sync({ alter: true })

module.exports = Matricula;