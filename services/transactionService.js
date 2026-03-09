import { sequelize } from '../models/sequelize.js'
import Usuario from '../models/Usuario.js'
import Pedido from '../models/Pedido.js'

export async function transactionUsuarioPedido() {
  const t = await sequelize.transaction()

  try {
    const usuario = await Usuario.create(
      {
        nombre: 'Marcos',
        edad: 20,
      },
      {
        transaction: t,
      }
    )

    const pedido = await Pedido.create(
      {
        descripcion: 'Producto comprado por Bryan',
        id_usuario: usuario.id_usuario,
      },
      {
        transaction: t,
      }
    )

    await t.commit()

    return pedido
  } catch (err) {
    await t.rollback()

    throw new Error(`Error al crear registro: ${err.message}`, { cause: err })
  }
}
