import http from 'http'

let server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/prueba') {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      const bodyString = body.toString()
      /*  const data = JSON.parse(bodyString) */

      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ received: bodyString }))
    })
  }
})

server.listen(3000, () => {
  console.log(`http://localhost:3000`)
})
