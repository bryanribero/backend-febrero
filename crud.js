import http from 'http'
import { pool } from './pgConnection.js'

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/productos') {
    try {
      const data = await pool.query('SELECT * FROM productos')

      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(data.rows))
    } catch (err) {
      res.writeHead(400, { 'content-type': 'text/plain' })
      res.end(`Error en la consulta: ${err}`)
    }
  }

  if (req.method === 'POST' && req.url === '/productos') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', async () => {
      const bodyString = body.toString()

      const { nombre_producto, precio_producto, cantidad_producto } =
        JSON.parse(bodyString)

      try {
        const data = await pool.query(
          `INSERT INTO productos
          (nombre_producto, precio_producto, cantidad_producto)
          VALUES($1, $2, $3) RETURNING *`,
          [nombre_producto, precio_producto, cantidad_producto]
        )

        const productoInsertado = data.rows[0]

        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(
          JSON.stringify({
            result: productoInsertado,
          })
        )
      } catch (err) {
        res.writeHead(400, { 'content-type': 'text/plain' })
        res.end(`Error al cargar datos en la DB: ${err}`)
      }
    })
  }
})

server.listen(3000, () => {
  console.log('http://localhost:3000')
})
