/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_pull
 */
export function pull(arr: unknown[], ...removeList: unknown[]) {
    const removeSet = new Set(removeList);
    return arr.filter((el) => !removeSet.has(el));
}
