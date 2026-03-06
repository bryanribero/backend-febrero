import Login from '../models/Login.js'

export async function getUser({ user_name, user_pass }) {
  try {
    const getUser = await Login.findAll({
      where: {
        user_name: user_name,
        user_pass: user_pass,
      },
    })

    return getUser.map((p) => p.toJSON())
  } catch (err) {
    console.error(`Error al buscar usuario: ${err.message}`)
    throw err
  }
}
