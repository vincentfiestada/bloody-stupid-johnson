export const CODES = {
  GENERIC: 150,
  INVALID_INPUT: 151,
  IO: 152,
  PARSE: 153,
  UNSUPPORTED_TYPE: 154
}

export default class FatalError extends Error {
  constructor(message: string, code = CODES.GENERIC) {
    super(message);
    this.code = code;
  }
  public readonly code: number;
}
