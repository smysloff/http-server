import HttpDispatcher from './HttpDispatcher.mjs'

const mockRequest = {}

const mockResponse = {

  send(data) {
    console.log(data)
  },

  error(code = 404) {
    this.send(`<h1>Error ${ code }</h1>`)
  },

}

export default class HttpRouter {

  constructor() {
    this.dispatcher = new HttpDispatcher()
  }

  get(path, handle) {
    this.dispatcher.add('get', path, handle)
  }

  post(path, handle) {
    this.dispatcher.add('post', path, handle)
  }

  put(path, handle) {
    this.dispatcher.add('put', path, handle)
  }

  delete(path, handle) {
    this.dispatcher.add('delete', path, handle)
  }

  resolve(method, path) {
    const handle = this.dispatcher.run(method, path)
    return handle
      ? handle(mockRequest, mockResponse)
      : mockResponse.error(404)
  }

}
