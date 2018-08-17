/**
 * Check if a JSONSchema type is numeric
 */
export default function isNumericType(type: any) {
  return ['number', 'Number', 'integer'].indexOf(type) > -1;
}
