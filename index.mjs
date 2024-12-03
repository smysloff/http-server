// file: index.mjs

import Server from './src/HttpServer.mjs'

const port = 8000
const host = '0.0.0.0'
const app = new Server()

app.get('/', (request, response) => {
  response.send('Home Page')
})

app.get('/blog', (request, response) => {
  response.send('Blog Page')
})

app.get('/blog/{id}', (request, response) => {
  response.send(`Article id: ${ request.params.id }`)
})

app.listen(port, host, () => {
  console.log(`server: start listen on http://${ app.address }`)
})
