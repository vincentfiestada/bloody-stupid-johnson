import ISchema from './ISchema';
import * as _ from 'lodash';
import isNumeric from './is-numeric-type';
import ITypeDef from './ITypeDef';
import escape from './escape';
import chalk from 'chalk';

export default function toConstraints(schema: ISchema, constraintPrefix: string): string {
  const conditions = _.compact(_.flatten(
      _.keys(schema.properties).map((key) => toConditions(key, schema.properties[key]))));
  return (conditions.length > 0) ? `CONSTRAINT ${chalk.underline(escape(`${constraintPrefix}_${Date.now()}`))} CHECK (${conditions.map((c) => `\n    ${c}`).join(' AND ')}\n  )` : '';
}

function toConditions(name: string, def: ITypeDef): string[] {
  const conditions = [];
  const type = def.type || def.instanceof;
  if (isNumeric(type)) {
    if (_.isNumber(def.minimum)) {
      const operator = (def.exclusiveMinimum) ? '>' : '>=';
      conditions.push(`(${escape(name)} ${operator} ${chalk.magenta(String(def.minimum))})`)
    }
    if (_.isNumber(def.maximum)) {
      const operator = (def.exclusiveMaximum) ? '<' : '<=';
      conditions.push(`(${escape(name)} ${operator} ${chalk.magenta(String(def.maximum))})`)
    }
  }
  return conditions;
}
