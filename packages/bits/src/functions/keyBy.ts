const keyByArray = (array: Array<any>, key: string) =>
    (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

export function keyBy(collection: Array<any> | Record<string, any>, key: string): Array<any> | Record<string, any> {
    return Array.isArray(collection)
        ? keyByArray(collection, key) as Array<any>
        : Object.values(keyBy(collection, key)) as Record<string, any>;
}
