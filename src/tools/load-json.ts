import { PathLike, readFile } from 'fs';
import {promisify} from 'util';
import FatalError, {CODES} from '../lib/FatalError';

export default async function loadJSON(path: PathLike): Promise<any> {
  let contents = null;
  try {
    contents = await promisify(readFile)(path, 'utf8');
  } catch (err) {
    throw new IOError(err);
  }
  try {
    return JSON.parse(contents);
  } catch (err) {
    throw new ParseError(err);
  }
}

class IOError extends FatalError {
  constructor(err: Error) {
    super(err.message, CODES.IO);
  }
}

class ParseError extends FatalError {
  constructor(err: Error) {
    super(err.message, CODES.PARSE);
  }
}
