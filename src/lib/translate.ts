import getSchema from './get-schema';
import * as _ from 'lodash';
import escape from './escape';
import ISchema from './ISchema';
import toColumn from './to-column';
import toTypeMeta from './to-type-meta';
import toConstraints from './to-constraints';

export default async function translate(schema: ISchema, tableName: string) {
  const primaryKeys: string[] = schema.primaryKey;
  let ddl = `CREATE TABLE ${escape(tableName)} IF NOT EXISTS (` +
  _.compact(_.keys(schema.properties).map((key) =>
    toColumn(key, schema.properties[key], schema.required || []) + toTypeMeta(key, schema.properties[key], primaryKeys))
  .concat(`PRIMARY KEY (${_.map(primaryKeys, escape).join(', ')})`)
  .concat(toConstraints(schema, `${tableName}_chk`)))
  .map((s) => `\n  ${s}`)
  .join(',') +
  `\n);`;
  return ddl;
}
