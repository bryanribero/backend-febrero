import Producto from '../models/producto.js'
import { ValidationError } from 'sequelize'

export async function createProduct({
  nombre_producto,
  precio_producto,
  cantidad_producto,
}) {
  try {
    const newProduct = await Producto.create({
      nombre_producto,
      precio_producto,
      cantidad_producto,
    })

    return newProduct.toJSON()
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new Error(
        `Datos inválidos: ${err.errors.map((e) => e.message).join(', ')}`,
        { cause: err }
      )
    } else {
      throw err
    }
  }
}

export async function getAllProduct() {
  try {
    const product = await Producto.findAll()

    return product.map((p) => p.toJSON())
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new Error(
        `Datos inválidos: ${err.errors.map((e) => e.message).join(', ')}`,
        { cause: err }
      )
    } else {
      throw err
    }
  }
}
