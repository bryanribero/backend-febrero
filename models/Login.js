import { sequelize } from './sequelize.js'
import { DataTypes, Model } from 'sequelize'

class Login extends Model {}

Login.init(
  {
    id_login: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_pass: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Login',
    tableName: 'logins',
    timestamps: false,
  }
)

export default Login
