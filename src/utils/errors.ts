export class NotFoundError extends Error {
  constructor() {
    super('Entity not found')
  }
}
