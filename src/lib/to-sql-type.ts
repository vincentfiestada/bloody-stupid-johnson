import ITypeDef from './ITypeDef';
import * as _ from 'lodash';
import escape from './escape';
import FatalError, {CODES} from './FatalError';
import bytesNeeded from './bytes-needed';
import chalk from 'chalk';

const MAX_32_INT = 2147483647;

/**
 * Convert a JS primitive type or class name to a SQL type
 */
export default function toSQLType(def: ITypeDef) {
  if (def.enum && _.isArray(def.enum) && def.enum.length > 0) {
    return `ENUM (${_.map(def.enum, (value: any) => chalk.yellow.underline(`\'${value}\'`)).join(', ')})`;
  }
  const type = def.instanceof || def.type;
  switch (type) {
    case 'number':
    case 'Number':
    case 'integer':
      return `INT(${bytesNeeded(def.maximum || (def.range ? def.range[1] : MAX_32_INT))})`;
    case 'string':
    case 'String':
    case 'RegExp':
      if (_.isNumber(def.maxLength)) {
        return  `VARCHAR(${def.maxLength})`;
      } else {
        return 'TINYTEXT';
      }
    case 'boolean':
    case 'Boolean':
      return 'BOOLEAN';
    case 'Date':
      return 'DATETIME';
    case 'Buffer':
      return 'BLOB';
    case 'object':
    case 'Object':
      return 'JSON';
    default:
      throw new UnsupportedTypeError(type);
  }
}

class UnsupportedTypeError extends FatalError {
  constructor(type: string) {
    super(`Unsupported type "${type}"`, CODES.UNSUPPORTED_TYPE);
  }
}
