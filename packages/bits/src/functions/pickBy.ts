/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_pickby
 */
export function pickBy(object: Record<string, unknown>) {
    const obj: Record<string, unknown> = {};
    for (const key in object) {
        if (object[key]) {
            obj[key] = object[key];
        }
    }
    return obj;
}
