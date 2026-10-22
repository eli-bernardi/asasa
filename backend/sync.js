const { Agendamento, Cliente, Console } = require('./models/rel')
const db = require('./db/conn')

async function syncDataBase() {
    try {
        await db.sync({ force: true })
        console.log('Abrindo conexão com o banco!')
    } catch (err) {
        console.error('Erro ao abrir a conexão!', err)
    } finally {
        await db.close()
        console.log('Fechando conexão com o banco!')
    }
}

syncDataBase()