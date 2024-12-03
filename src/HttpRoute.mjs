export default class HttpRoute {

  static pattern = /\{\s*([^\s\/]+)\s*\}/g
  static replace = '(?<$1>[^\/]+)'

  static createRegExp(path) {
    const regexp = path.replace(this.pattern, this.replace)
    return new RegExp(`^${ regexp }$`)
  }

  constructor(method, path, handle) {
    this.method = method
    this.path = path
    this.handle = handle
    this.regexp = HttpRoute.createRegExp(path)
  }

  match(path) {
    return path.match(this.regexp)
  }

  run(request, response) {
    this.handle(request, response)
  }

}
