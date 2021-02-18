import { isNil } from "./isNil";

/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_pull
 */
export function pull(origin: unknown[], ...removeList: unknown[]) {
    if (isNil(origin)) {
        return undefined;
    }

    if (!origin.filter) {
        return origin;
    }

    const removeSet = new Set(removeList);

    return origin.filter((el) => !removeSet.has(el));
}
