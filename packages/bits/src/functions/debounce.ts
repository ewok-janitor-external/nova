/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_debounce
 */
export function debounce(func: Function, wait: number, immediate: boolean) {
    let timeout: NodeJS.Timeout | null;
    return function() {
        const context = this, args = arguments;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) { func.apply(context, args); }
        }, wait);
        if (immediate && !timeout) { func.apply(context, args); }
    };
  }
