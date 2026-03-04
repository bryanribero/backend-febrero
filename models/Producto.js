import { DataTypes, Model } from 'sequelize'
import { sequelize } from './sequelize.js'

class Producto extends Model {}

Producto.init(
  {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre_producto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precio_producto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    cantidad_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos',
    timestamps: false,
  }
)

export default Producto
