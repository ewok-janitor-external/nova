/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_difference
 */
export function difference(origin: unknown[], target: unknown[]) {
    return ([origin, target].reduce((a, b) => a.filter(c => !b.includes(c))));
}
