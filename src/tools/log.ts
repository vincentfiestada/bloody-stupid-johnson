import chalk from 'chalk';
import {map} from 'lodash';
import FatalError from '../lib/FatalError';

export const log = console.log;

export const info = console.info;

export const error = console.error;

export const warn = console.warn;

export function fatal(fatalError: FatalError) {
  error(
    '🤬 ',
    chalk.red(`Fatal Error ${fatalError.code}:`),
    fatalError.message
  );
  process.exit(fatalError.code);
}
