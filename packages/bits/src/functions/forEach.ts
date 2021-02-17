type HandlerType = (value: unknown, index: number) => void;

/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_each
 */
export function forEach(origin: object | unknown[], handler: HandlerType): void {
    if (Array.isArray(origin)) {
        origin.forEach(handler);
        return;
    }

    const objHandler = ([objValue, objKey]: [unknown, number]) => handler(objValue, objKey);
    Object.entries(origin).forEach(objHandler);
}

export function each(origin: object | unknown[], handler: HandlerType): void {
    return forEach(origin, handler);
}
