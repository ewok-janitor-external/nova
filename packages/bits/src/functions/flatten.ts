/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_flatten
 */
export function flatten(origin: Array<unknown>[]) {
    return origin.reduce((a, b) => a.concat(b), []);
}
