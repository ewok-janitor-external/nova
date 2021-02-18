import { isNil } from "./isNil";

/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
 */
export function get(origin: Record<string, any>, path: string, defaultValue?: any) {
    if (isNil(origin) || isNil(path)) {
        return undefined;
    }

    if (!path.split) {
        return undefined;
    }

    const travel = (regexp: RegExp) =>
        String.prototype.split
            .call(path, regexp)
            .filter(Boolean)
            .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), origin);
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === origin ? defaultValue : result;
}
