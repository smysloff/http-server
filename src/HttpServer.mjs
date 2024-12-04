// file: src/HttpServer.mjs

import { Server } from 'node:http'
import Router from './HttpRouter.mjs'
import MimeTypes from './MimeTypes.mjs'
import { mixin } from './Utils.mjs'
import { sendable } from './Mixins.mjs'

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

  listen(port, host, callback) {
    this.server.on('request', (request, response) => {
      mixin(response, sendable) // @todo move to middleware?
      // @todo set headers
      response.statusCode = 200
      response.setHeader('Content-Type', MimeTypes.get('txt'))
      // @todo error pages
      this.router.resolve(request, response)
      response.end()
    })
    this.server.listen(port, host, callback)
  }

  get address() {
    const { address: host, port } = this.server.address()
    let address = ['0.0.0.0', '127.0.0.1'].includes(host) ? 'localhost' : host
    address += (port === 80) ? '' : `:${ port }`
    return address
  }

}
