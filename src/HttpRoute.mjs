// file: src/HttpRoute.mjs

export default class HttpRoute {

  static pattern = /\{\s*([^\s\/]+)\s*\}/g
  static replace = '(?<$1>[^\/]+)'

  constructor(method, path, handle) {
    this.method = method
    this.path = HttpRoute.createPath(path)
    this.handle = handle
  }

  match(path) {
    const match = path.match(this.path)
    return {
      match: match !== null,
      params: match?.groups ?? {},
    }
  }

  run(request, response) {
    this.handle(request, response)
  }

  static createPath(path) {
    const regexp = path.replace(HttpRoute.pattern, HttpRoute.replace)
    return new RegExp(`^${ regexp }$`)
  }

}
