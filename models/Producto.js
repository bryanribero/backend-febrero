import { DataTypes, Model } from 'sequelize'
import { sequelize } from './sequelize'

class Producto extends Model {}

Producto.init(
  {
    nombre_producto: {
      type: DataTypes.TEXT,
      primaryKey: true,
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
  },
  {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos',
    timestamps: false,
  }
)

export default Producto
