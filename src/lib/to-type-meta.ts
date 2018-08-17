import ITypeDef from './ITypeDef';
import * as _ from 'lodash';
import isNumeric from './is-numeric-type';
import escape from './escape';

export default function toTypeMeta(name: string, def: ITypeDef, primaryKeys: string[]): string {
  const modifiers = [];
  const type = def.type || def.instanceof;
  if (_.includes(primaryKeys, name)) {
    modifiers.push('UNIQUE');
    if (isNumeric(type)) {
      modifiers.push('AUTO_INCREMENT');
    }
  }
  return (modifiers.length > 0) ? ' ' + modifiers.join(' ') : '';
}
