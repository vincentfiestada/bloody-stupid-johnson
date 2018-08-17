import ITypeDef from './ITypeDef';

export default interface ISchema extends ITypeDef {
  primaryKey: string[];
  properties: {
    [propName: string]: ITypeDef
  }
}
