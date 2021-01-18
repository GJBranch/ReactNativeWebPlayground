function deepMerge(target: any, source: any): any {
    const isObject = (obj) => obj && typeof obj === 'object';
    return {
        ...target,
        ...Object.entries(source).reduce((result, [key, value]) => {
            if (!Array.isArray(value) && !Array.isArray(target[key]) &&
                isObject(value) && isObject(target[key])) {
                result[key] = deepMerge(target[key], value);
            } else {
                result[key] = value;
            }
            return result;
        }, {})
    }
}

const utils = {
    deepMerge
};
export default utils