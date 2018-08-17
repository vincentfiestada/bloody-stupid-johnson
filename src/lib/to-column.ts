import escape from './escape';
import chalk from 'chalk';
import toSQLType from './to-sql-type';
import * as _ from 'lodash';
import ITypeDef from './ITypeDef';

/**
 * Convert a property definition to a column definition
 * @param {string} name name of the column
 * @param {object} def the property definition
 * @param {string[]} required list of required properties
 * @return {string} the SQL column definition
 */
export default function propertyToColumn(name: string, def: ITypeDef, required: string[]): string {
  return `${escape(name)} ${chalk.green(toSQLType(def))}${_.includes(required, name) ? ' NOT NULL' : ''}`;
}
