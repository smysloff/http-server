import HttpRoute from './HttpRoute.mjs'

export default class HttpDispatcher {

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

  run(method, path) {
    for (const route of this.routes[method]) {
      const match = route.match(path)
      if (match) {
        const params = match.groups ?? {}
        return (request, response) => {
          request.params = params
          route.run(request, response)
        }
      }
    }
    return null
  }

}
