export function isDefined(value: any) {
    return value !== undefined;
}

export function isObject(value: any) {
    return typeof value === 'object' && isDefined(value);
}

export function isPromise(value: any) {
    return value instanceof Promise;
}

export function isFunction(value: any) {
    return value instanceof Function;
}
