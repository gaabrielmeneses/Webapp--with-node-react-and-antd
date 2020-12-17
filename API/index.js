const customExpress = require('./config/customExpress')
const db_connection =  require('./infrastructure/connection')
const Tables = require('./infrastructure/tables')

db_connection.connect(erro => {
    if(erro){
        console.log(erro)
    }
    else {
        console.log('conexão realizada com sucesso!')
        
        Tables.init(db_connection)
        const app = customExpress()

        app.listen(8080, () => console.log('Servidor Rodando na porta 8080'))

    }
})
