import HttpRoute from './HttpRoute.mjs'

export default class HttpRouter {

  constructor() {
    this.routes = {
      get: [],
      post: [],
      put: [],
      delete: [],
    }
  }

  add(method, path, handle) {
    this.routes[method].push(new HttpRoute(method, path, handle))
  }

  resolve(request, response) {

    const method = request.method.toLowerCase()
    const path = request.url

    response.send = function(content) {
      response.write(content)
    }

    for (const route of this.routes[method]) {
      const match = route.match(path)
      if (match) {
        const params = match.groups ?? {}
        request.params = params
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/plain')
        route.run(request, response)
        return
      }
    }

    response.statusCode = 404
    response.setHeader('Content-Type', 'text/plain')
    response.send('Error 404: Page Not Found')
  }

}
