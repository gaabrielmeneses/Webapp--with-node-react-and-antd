const db_connection = require('../infrastructure/connection')


class Contato {
    adicionar(contato, res){
        
        let sexo_tamanho_valido = true, sexo_valido = true
        let nome_valido = !contato.nome.trim().length
        let telefone_valido = true
        let email_valido = true
        let email_regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

        if(!contato.sexo.trim().length){
            sexo_tamanho_valido = false
        }
        
        if(contato.sexo.toUpperCase() !== "MASCULINO" && contato.sexo.toUpperCase() !== "FEMININO" && contato.sexo.toUpperCase() !== "OUTROS"){
            sexo_valido = false
        } 
        
        if(!contato.telefone.trim().length || contato.telefone.split('-')[1].length < 4 || contato.telefone.replace(/\D/g, '').length <= 9 || !/\(/.test(contato.telefone) 
            || !/\)/.test(contato.telefone) || !/\-/.test(contato.telefone)){
            telefone_valido = false
        }
        
        if(!contato.email.trim().length || !contato.email || !email_regex.test(contato.email)){
            email_valido = false
        }
    
        const validacao = [
            {
                nome_do_campo: 'nome',
                valido: !nome_valido,
                mensagem: 'O campo nome não pode ser vazio'
            },
            {
                nome_do_campo: 'sexo',
                valido: sexo_tamanho_valido,
                mensagem: 'O campo sexo não pode ser vazio'
            },
            {
                nome_do_campo: 'sexo',
                valido: sexo_valido,
                mensagem: 'O campo sexo está inválido. Exemplo: Masculino, Feminino e Outros'
            },
            {
                nome_do_campo: 'telefone',
                valido: telefone_valido,
                mensagem: 'O campo telefone está inválido. Exemplo: (99) 98877-6655 ou (99) 3322-1100'
            },
            {
                nome_do_campo: 'email',
                valido: email_valido,
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