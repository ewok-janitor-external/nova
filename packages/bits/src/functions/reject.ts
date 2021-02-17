/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_reject
 */
export function reject(arr: unknown[], predicate: Function) {
    const complement = (f: Function) => (x: any) => !f(x);

    return arr.filter(complement(predicate));
}
