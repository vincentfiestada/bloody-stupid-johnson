import FatalError, { CODES } from '../lib/FatalError';
import {fatal} from './log';

export default function wrapAction(fn: Function) {
  return function () {
    return Promise.resolve(fn.apply(null, arguments)).catch(handleError);
  }
}

function handleError(err: Error) {
  if (err instanceof FatalError) {
    fatal(err);
  } else {
    fatal(new FatalError(err.message));
  }
}
