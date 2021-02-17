/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_sortby-and-_orderby
 */
export function sortBy(arr: unknown[], sortKey: string) {
    const sortByHandler = (key: string) =>
        (a: any, b: any) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
    return arr.concat().sort(sortByHandler(sortKey));
}
