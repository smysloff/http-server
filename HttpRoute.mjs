export default class HttpRoute {

  static pattern = /\{\s*([^\s\/]+)\s*\}/g
  static replace = '(?<$1>[^\/]+)'

  static createPattern(path) {
    const regexp = path.replace(
      HttpRoute.pattern, HttpRoute.replace)
    return new RegExp(`^${ regexp }$`)
  }

  constructor(method, path, handle) {
    this.method = method
    this.path = path
    this.handle = handle
    this.pattern = HttpRoute.createPattern(path)
  }

  match(path) {
    return path.match(this.pattern)
  }

  run(request, response, params) {
    request.params = params
    return this.handle(request, response)
  }

}
