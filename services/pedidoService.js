import Pedido from '../models/Pedido.js'
import Usuario from '../models/Usuario.js'

export async function getPedidoInner() {
  try {
    const query = await Pedido.findAll({
      where: {
        id_usuario: 2,
      },
      include: {
        model: Usuario,
      },
    })

    return query.map((p) => p.toJSON())
  } catch (err) {
    console.log(`Error en la consulta a la base de datos: ${err}`)
  }
}
