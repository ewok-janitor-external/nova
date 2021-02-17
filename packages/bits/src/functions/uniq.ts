/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_uniq
 */
export function uniq(array: unknown[]) {
    return [...new Set(array)];
}
