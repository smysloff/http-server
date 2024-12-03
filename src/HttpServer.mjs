import { Server } from 'node:http'
import Router from './HttpRouter.mjs'

export default class HttpServer {

  constructor() {
    this.server = new Server()
    this.router = new Router()
  }

  get(path, handle) {
    this.router.add('get', path, handle)
  }

  post(path, handle) {
    this.router.add('post', path, handle)
  }

  put(path, handle) {
    this.router.add('put', path, handle)
  }

  delete(path, handle) {
    this.router.add('delete', path, handle)
  }

  listen(port, host, cb) {
    this.server.on('request', (request, response) => {
      this.router.resolve(request, response)
      response.end()
    })
    this.server.listen(port, host, cb)
  }

  get address() {
    const { address: host, port } = this.server.address()
    let address = ['0.0.0.0', '127.0.0.1'].includes(host) ? 'localhost' : host
    address += (port === 80) ? '' : `:${ port }`
    return address
  }

}
