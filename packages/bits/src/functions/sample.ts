/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_sample
 */
export function sample(arr: unknown[]) {
  const len = arr == null ? 0 : arr.length;
  return len ? arr[Math.floor(Math.random() * len)] : undefined;
}
