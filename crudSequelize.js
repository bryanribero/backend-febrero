import { createProduct } from './services/productoService.js'
import http from 'http'

const server = http.createServer(async (req, res) => {
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
})

server.listen(3000, () => console.log('http://localhost:3000'))
