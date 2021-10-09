const customExpress = require('./config/customExpress')
const connection = require('./infrastructure/connection')
const Tables = require('./infrastructure/tables')

connection.connect(error => {
    if(error) {
        console.log(error)
    } else {
        console.log('BANCO CONECTADO COM SUCESSO')

        Tables.init(connection)
        const app = customExpress()
        app.listen(3000, () => console.log('SERVIDOR RODANDO NA PORT 3000'))
    }
})

