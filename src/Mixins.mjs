// file: src/Mixins.mjs

export const sendable = {
  send(message) {
    this.write(message)
  },
}
