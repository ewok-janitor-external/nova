/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk
 */
export function chunk (input: any[], size: number) {
    return input.reduce((arr, item, idx) =>
      idx % size === 0
        ? [...arr, [item]]
        : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]], []);
  }
