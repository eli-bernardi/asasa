const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Console = db.define('console', {
    codConsole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    numeroSerie: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //Adição da chave estrangeira e do tipo de serviço para o console
    tipoServico: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    }
}, {
    timestamps: false,
    tableName: 'consoles'
})

module.exports = Console