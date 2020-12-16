class Tables {
    init(db_connection) {
        this.db_connection = db_connection

        this.criar_contato()
    }

    criar_contato(){
        const sql = 'CREATE TABLE IF NOT EXISTS Contatos (id int NOT NULL AUTO_INCREMENT, nome varchar(15) NOT NULL, sexo varchar(10) NOT NULL, telefone varchar(15) NOT NULL, email text(50) NOT NULL, PRIMARY KEY(id))'
        this.db_connection.query(sql, erro => {
            if(erro){
                console.log(erro)
            }
            else {
                console.log('Tabela de Contatos criada com sucesso')

            }
        } )
    }
}

module.exports = new Tables