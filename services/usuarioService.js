import Usuario from '../models/Usuario.js'

export async function deleteUser(id) {
  const query = await Usuario.destroy({
    where: { id_usuario: id },
  })

  return query
}
