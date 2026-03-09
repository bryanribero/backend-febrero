import Pedido from './models/Pedido.js'
import { getUser } from './services/loginService.js'
import {
  getPedidoByPK,
  getPedidoInner,
  updatePedido,
} from './services/pedidoService.js'
import {
  createProduct,
  getAllProduct,
  getProductWhere,
} from './services/productoService.js'
import http from 'http'
import { deleteUser } from './services/usuarioService.js'
import { transactionUsuarioPedido } from './services/transactionService.js'

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method === 'POST' && req.url === '/productos') {
    let body = ''

    req.on('data', (chunk) => (body += chunk))

    req.on('end', async () => {
      try {
        const insercion = body.toString()

        const data = await createProduct(JSON.parse(insercion))

        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(data))
      } catch (err) {
        res.writeHead(400, { 'content-type': 'text/plain' })
        res.end(`Error capturado: ${err}`)
      }
    })
  }

  if (req.method === 'GET' && req.url === '/productos') {
    try {
      const data = await getAllProduct()

      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(data))
    } catch (err) {
      res.writeHead(500, { 'content-type': 'plain/text' })
      res.end(`Error de parte del servidor: ${err}`)
    }
  }

  if (req.method === 'GET' && req.url === '/productos/where') {
    try {
      const data = await getProductWhere()

      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(data))
    } catch (err) {
      res.writeHead(500, { 'content-type': 'text/plain' })
      res.end(`Error en el servidor: ${err}`)
    }
  }

  if (req.method === 'POST' && req.url === '/login') {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', async () => {
      const bodyToString = body.toString()
      const obj = JSON.parse(bodyToString)

      try {
        const user = await getUser(obj)

        if (user.length === 0) {
          res.writeHead(200, { 'content-type': 'application/json' })
          res.end(
            JSON.stringify({
              success: false,
            })
          )
          return
        }

        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(
          JSON.stringify({
            success: true,
          })
        )
      } catch (err) {
        res.writeHead(500, { 'content-type': 'text/plain' })
        res.end(`Error del servidor: ${err}`)
      }
    })
  }

  if (req.method === 'GET' && req.url === '/pedidos') {
    try {
      const data = await getPedidoInner()

      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(data))
    } catch (err) {
      res.writeHead(401, { 'content-type': 'text/plain' })
      res.end(`Error: ${err}`)
    }
  }

  if (req.method === 'PATCH' && req.url === '/pedidos') {
    try {
      const updateData = await updatePedido()

      if (updateData > 0) {
        const response = await getPedidoByPK(30)

        res.writeHead(200, {
          'content-type': 'application/json',
        })
        res.end(JSON.stringify(response))
      } else {
        throw new Error(`No se encontro el pedido con el id`)
      }
    } catch (err) {
      res.writeHead(401, { 'content-type': 'text/plain' })
      res.end(`Error: ${err.message}`)
    }
  }

  if (req.method === 'DELETE' && req.url === '/usuarios') {
    try {
      const data = await deleteUser(4)

      if (data > 0) {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(
          JSON.stringify({
            result: `Registros eliminados: ${data}`,
          })
        )
      } else {
        throw new Error(`Registro no encontrado`)
      }
    } catch (err) {
      res.writeHead(401, { 'content-type': 'text/plain' })
      res.end(`${err}`)
    }
  }

  if (req.method === 'POST' && req.url === '/transaction') {
    try {
      const data = await transactionUsuarioPedido()

      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(data))
    } catch (err) {
      res.writeHead(500, { 'content-type': 'text/plain' })
      res.end(err.message)
    }
  }
})

server.listen(3000, () => console.log('http://localhost:3000'))
