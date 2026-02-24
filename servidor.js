import http from 'http'

let server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('Mensaje de saludo')
})

server.listen(3000, () => {
  console.log(`http://localhost:3000`)
})
