import * as JSONSchemaValidator from 'ajv';
import FatalError, {CODES} from './FatalError';
import * as log from '../tools/log';
import * as _ from 'lodash';
import chalk from 'chalk';

/**
 * Check if an object is a valid JSONSchema
 * @throws {InvalidSchemaError}
 */
export default function validate(schema: object) {
  const validator = new JSONSchemaValidator({
    allErrors: true
  });
  if (validator.validateSchema(schema) !== true || validator.validate({
    type: 'object',
    required: ['primaryKey'],
    properties: {
      primaryKey: {
        type: 'array',
        items: {
          type: 'string'
        },
        additionalItems: false
      },
    },
    minProperties: 1
  }, schema) !== true) {
    (validator.errors || []).forEach((error) => {
      log.error('❌ ', chalk.red.underline(error.dataPath), error.message);
    });
    throw new InvalidSchemaError((validator.errors || []).length);
  }
}

class InvalidSchemaError extends FatalError {
  constructor(errorCount: number) {
    super(`The provided schema is invalid. ${errorCount} errors detected.`);
  }
  public code: number = CODES.INVALID_INPUT;
}
