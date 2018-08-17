export default interface ITypeDef {
  type: string;
  instanceof?: string;
  properties?: {
    [propName: string]: ITypeDef
  };
  additionalProperties?: boolean;
  additionalItems?: boolean;
  required?: string[];
  items?: ITypeDef;
  enum?: Array<any>;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  range?: number[];
  minItems?: number;
  maxItems?: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
}
