export function convertJsonToDotNotation(obj: any, parentKey: string = ''): any {
    let result = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            console.log('newKey > ', newKey);
            
            if (Array.isArray(obj[key])) {
                obj[key].forEach((item, index) => {
                    result.push(...convertJsonToDotNotation(item, `${newKey}.${index}`));
                });
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                result.push(...convertJsonToDotNotation(obj[key], newKey));
            } else {
                result.push(newKey);
            }
        }
    }

    return result;
}