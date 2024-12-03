// file: src/HttpRouter.mjs

import HttpRoute from './HttpRoute.mjs'
import MimeTypes from './MimeTypes.mjs'

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
    const route = new HttpRoute(method, path, handle)
    this.routes[method].push(route)
  }

  resolve(request, response) {

    const method = request.method.toLowerCase()
    const path = request.url

    for (const route of this.routes[method]) {
      const { match, params } = route.match(path)
      if (match) {
        request.params = params
        return route.run(request, response)
      }
    }

    return this.error404(request, response)

  }

  error404(request, response) {
    response.statusCode = 404
    response.setHeader('Content-Type', MimeTypes.get('txt'))
    response.send('Error 404: Page Not Found')
  }

}
