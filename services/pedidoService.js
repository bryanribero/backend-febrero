import Pedido from '../models/Pedido.js'
import Usuario from '../models/Usuario.js'

export async function getPedidoInner() {
  try {
    const query = await Pedido.findAll({
      attributes: ['id_pedido', 'descripcion'],
      where: {
        id_usuario: 2,
      },
      include: {
        model: Usuario,
        attributes: ['nombre'],
      },
      nest: true,
    })

    return query
  } catch (err) {
    console.log(`Error en la consulta a la base de datos: ${err}`)
  }
}

export async function updatePedido() {
  const query = await Pedido.update(
    {
      descripcion: 'Cambie la descripcion xd',
    },
    {
      where: {
        id_pedido: 30,
      },
    }
  )

  return query[0]
}

export async function getPedidoByPK(id) {
  const query = await Pedido.findByPk(id, { nest: true })

  return query
}
