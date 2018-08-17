import loadJSON from '../tools/load-json'
import validateSchema from './validate-schema';
import ISchema from './ISchema';

/**
 * Load a JSONSchema and validate it
 */
export default async function getSchema(filename: string): Promise<ISchema> {
  const schema = await loadJSON(filename);
  await validateSchema(schema);
  return schema as ISchema;
}
