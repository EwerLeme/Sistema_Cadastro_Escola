require('dotenv').config();
const express = require('express');
const path = require('path')
const aluno = require('./models/aluno')
const matricula = require('./models/matricula')
const turma = require('./models/turma')
const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/aluno", (req, res) => {
    res.sendFile(__dirname + '/views/aluno.html');
});

app.get("/matricula", (req, res) => {
    res.sendFile(__dirname + '/views/matricula.html');
});

app.get("/turma", (req, res) => {
    res.sendFile(__dirname + '/views/turma.html');
});

app.get("/listar-alunos", async (req, res) => {
    await aluno.findAll({
        order:[['id', 'DESC']]
    })
    .then((alunos) => {
        return res.json({
            erro: false,
            dados: alunos
        })
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: 'erro: Aluno não cadastrado com sucesso'
            })
        })
});

app.get("/listar-turma/:id?", async (req, res) => {
    var id = req.params.id
    await matricula.findAll({
        where: {
            id_turma: id
        },
        include: [{
            attributes: ['nome', 'data_nascimento'],
            model: aluno
        }]
    })
    .then((dados) => {
        return res.json({
            erro: false,
            dados
        })
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: 'erro:turma não encontrada'
            })
        })
});

app.post("/cadastrar", async (req, res) => {
    await aluno.create(req.body)
    .then(() => {
        return res.redirect('/aluno')
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: 'erro: Aluno não cadastrado com sucesso'
            })
        })
});

app.post("/cadastrar-matricula", async (req, res) => {
    var id = req.body.id_turma

    await matricula.findAll({
        where: {
            id_turma: id
        },
        include: [{
            attributes: ['vagas'],
            model: turma
        }]
    })
    .then( async (dados) => {
        if(dados.length === 0) {
            await matricula.create(req.body)
            .then(() => {
                return res.redirect('/matricula')
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: 'erro: matricula não cadastrado com sucesso'
                })
            })
        }
        else {
            var vagas = dados[0].turma.vagas
            var quantiade = dados.length

            if(quantiade < vagas) {
                await matricula.create(req.body)
                .then(() => {
                    return res.redirect('/matricula')
                }).catch(() => {
                    return res.status(400).json({
                        erro: true,
                        mensagem: 'erro: matricula não cadastrado com sucesso'
                    })
                })
            }
            else {
                return res.json({
                    erro: true,
                    mensagem: 'erro: Turma sem vagas!'
                })
            }
        }
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: 'erro:turma ou matricula não encontrada'
        })
    })
});

app.post("/cadastrar-turma", async (req, res) => {
    await turma.create(req.body)
    .then(() => {
        return res.redirect('/turma')
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: 'erro: turma não cadastrado com sucesso'
            })
        })
});

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server in listen on port ${port}`))