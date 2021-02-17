/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle
 */
export function throttle(func: Function, timeFrame: number | string) {
    let lastTime = 0;
    return (...args: unknown[]) => {
        const now = (new Date()).getMilliseconds();
        const tf = Number(timeFrame);
        if (now - lastTime >= tf) {
            func(...args);
            lastTime = now;
        }
    };
}
