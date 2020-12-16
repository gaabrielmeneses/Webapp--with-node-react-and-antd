const cadastros = require('../models/cadastros')
const Contato = require ('../models/cadastros')

module.exports = app => {
    app.get('/cadastro', (req, res) => {
            Contato.listar(res)
        }
    )

    app.get('/cadastro/:id', (req, res) => {
            const id = parseInt(req.params.id)
            
            cadastros.busca_por_id(id, res)
        }
    )

    app.post('/cadastro', (req, res) => {
            const contato =  req.body

            Contato.adicionar(contato, res)
        }
    )

    app.patch('/cadastro/:id', (req, res) => {
            const id = parseInt(req.params.id)
            const valores = req.body

            Contato.alterar(id, valores, res)
        }
    )

    app.delete('/cadastro/:id', (req, res) => {
            const id = parseInt(req.params.id)

            Contato.deletar(id, res)
        }
    )
}