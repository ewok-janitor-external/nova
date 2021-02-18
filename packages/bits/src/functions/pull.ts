import { isNil } from "./isNil";

/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_pull
 */
export function pull(origin: unknown[], ...removeList: unknown[]) {
    if (isNil(origin)) {
        return undefined;
    }

    const removeSet = new Set(removeList);


    if (!origin.filter) {
        return origin;
    }

    return origin.filter((el) => !removeSet.has(el));
}
