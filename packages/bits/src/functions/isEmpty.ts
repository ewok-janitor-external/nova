import { isNil } from "./isNil";

/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
 */
export function isEmpty(origin: any) {
    if (isNil(origin)) {
        return undefined;
    }

    if (typeof origin === "string") {
        return !Boolean(origin.length);
    }

    const isObjectLike = [Object, Array].includes((origin || {}).constructor);
    if (!isObjectLike) {
        return true;
    }

    return !Object.entries((origin || {})).length;
}
