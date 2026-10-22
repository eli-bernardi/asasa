//Os arquivos controller na arquitetura do sistema 
// são separados para cada entidade
const Agendamento = require('../models/Agendamento')
const Cliente = require('../models/Cliente')
const Console = require('../models/Console')
const cadastrar = async (req, res) => {
    const valores = req.body
    if (!valores.idCliente || !valores.idConsole || !valores.data || !valores.hora) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }
    try {
        const cliente = await Agendamento.findByPk(valores.idCliente)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' })
        }
        const console = await Agendamento.findByPk(valores.idConsole)
        if (!console) {
            return res.status(404).json({ message: 'Console não encontrado' })
        }
        const novoAgendamento = await Agendamento.create(valores)
        return res.status(201).json({ message: 'Agendamento cadastrado com sucesso!' })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao cadastrar Agendamento!' })
    }
}
const listar = async (req, res) => {
    try {
        const agendamento = await Agendamento.findAll({
            order: [['data', 'ASC']],
            include: [
                {
                    model: Cliente,
                    as: 'clienteAgendamento',
                    attributes: ['codCliente', 'nome', 'email', 'telefone']
                },
                {
                    model: Console,
                    as: 'consoleAgendamento',
                    attributes: ['codConsole', 'modelo', 'marca', 'tipo', 'idCliente']
                }
            ]
        })

        return res.status(200).json(agendamento)
    } catch (err) {
        return res.status(500).json({ message: 'Função de listar não implementada!' })
    }
}
const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    try {
        const agendamento = await Agendamento.findByPk(id)
        if (!agendamento) {
            return res.status(404).json({ message: 'Dados não encontrados' })
        }
        if (valores.idCliente) {
            const cliente = await Cliente.findByPk(valores.idCliente)
            if (!cliente) {
                return res.status(400).json({ message: 'Cliente não encontrado' })
            }
        }
        if (valores.idConsole) {
            const console = await Console.findByPk(valores.idConsole)
            if (!console) {
                return res.status(400).json({ message: 'console não encontrado' })
            }
        }
        await Agendamento.update(valores, { where: { codAgendamento: id } })
        return res.status(200).json({ message: 'Agendamento atualizado com sucesso!' })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao atualizar Agendamento!' })
    }
}
module.exports = { cadastrar, listar, atualizar }