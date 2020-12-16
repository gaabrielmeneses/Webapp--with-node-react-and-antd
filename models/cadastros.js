const db_connection = require('../infrastructure/connection')

class Contato {
    adicionar(contato, res){
        
        const nome_eh_valido = contato.nome.length >= 5
        const sexo_eh_valido = contato.sexo.length >= 8
        const telefone_eh_valido = contato.telefone.length >= 11
        const email_eh_valido = contato.email.length >= 8

        const validacao = [
            {
                nome_do_campo: 'nome',
                valido: nome_eh_valido,
                mensagem: 'O campo nome deve ter pelo menos 5 caracteres'
            },
            {
                nome_do_campo: 'sexo',
                valido: sexo_eh_valido,
                mensagem: 'O campo sexo deve ter pelo menos 8 caracteres, exemplo: Masculino, Feminino ou Outros'
            },
            {
                nome_do_campo: 'telefone',
                valido: telefone_eh_valido,
                mensagem: 'O campo telefone deve seguir o padrão: (XX)XXXXX-XXXX'
            },
            {
                nome_do_campo: 'email',
                valido: email_eh_valido,
                mensagem: 'O campo e-mail deve seguir o exemplo: seu.email@seuemail.com'
            }
        ]

        const erros = validacao.filter(campo => !campo.valido)
        const existem_erros = erros.length

        if(existem_erros) {
            res.status(400).json(erros)
        }
        else {
            const sql = 'INSERT INTO Contatos SET ?'

            db_connection.query(sql, contato, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                }
                else {
                    res.status(201).json(contato)
                }
            })
        }
    }
    
    listar(res) {
        const sql = 'SELECT * FROM Contatos'

        db_connection.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else {
                res.status(200).json(resultados)
            }
        })
    }

    alterar(id, valores, res){
        const sql = 'UPDATE Contatos SET ? WHERE id=?'

        db_connection.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deletar(id, res) {
        const sql = 'DELETE FROM Contatos WHERE id=?'

        db_connection.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else {
                res.status(200).json(resultados)
            }
        })
    }

    busca_por_id(id, res){
        const sql = 'SELECT * FROM Contatos WHERE id=${id}'
        
        db_connection.query(sql, (erro, resultados) => {
            const contato = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(contato)
            }
        })
    }
}

module.exports =  new Contato