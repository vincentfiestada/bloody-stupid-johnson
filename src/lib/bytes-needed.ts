import nearestMultipleOf from './nearest-multiple';

/**
 * Return the number of bytes needed to store `int` as a signed integer
 */
export default function bytesNeeded(int: number) {
  // Turn into a multiple of 2
  return nearestMultipleOf(2, Math.ceil(Math.log2(int)) + 1);
}
