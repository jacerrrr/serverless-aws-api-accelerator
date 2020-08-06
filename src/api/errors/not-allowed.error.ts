export class NotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.stack = new Error().stack;

    Object.setPrototypeOf(this, NotAllowedError.prototype);
  }
}
