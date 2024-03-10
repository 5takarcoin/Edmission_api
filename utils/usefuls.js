
function flattenObject(obj, prefix = '') {
    let flatObject = {};
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            const nestedObj = flattenObject(obj[key], `${prefix}${key}.`);
            flatObject = { ...flatObject, ...nestedObj };
        } else {
            flatObject[`${prefix}${key}`] = obj[key];
        }
    }
    return flatObject;
}

module.exports = flattenObject