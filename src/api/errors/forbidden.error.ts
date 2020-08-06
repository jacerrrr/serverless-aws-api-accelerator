export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.stack = new Error().stack;

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
