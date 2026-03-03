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
})

server.listen(3000, () => {
  console.log('http://localhost:3000')
})
