/**
 * Get the nearest multiple of `n` greater than a number
 * @return {number} a multiple of `n` >= `int`
 */
export default function nearestMultipleOf(n: number, int: number) {
  while (int % n !== 0) {
    int++;
  }
  return int;
}
