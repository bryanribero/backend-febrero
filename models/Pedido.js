import { sequelize } from './sequelize.js'
import Usuario from './Usuario.js'
import { Model, DataTypes } from 'sequelize'

class Pedido extends Model {}

Pedido.init(
  {
    id_pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: 'id_usuario',
      },
      onDelete: 'CASCADE',
    },
    fecha_creacion: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos',
    timestamps: false,
  }
)

Pedido.belongsTo(Usuario, { foreignKey: 'id_usuario' })

export default Pedido
