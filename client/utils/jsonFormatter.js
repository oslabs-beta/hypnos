export const jsonFormatter = (obj) => {
    let strObj = JSON.stringify(obj);
    let resultStr = '';
    let tab = '  ';
    let nestLevel = 0
    for (let char of strObj) {
        if (char === '{') {
            resultStr += char;
            resultStr += '\n'
            nestLevel += 1;
            resultStr += tab.repeat(nestLevel);
        } else if (char === ',') {
            resultStr += char;
            resultStr += '\n';
            resultStr += tab.repeat(nestLevel);
        } else if (char === '}') {
            resultStr += '\n';
            nestLevel -= 1;
            resultStr += tab.repeat(nestLevel);
            resultStr += char;
        } else {
            resultStr += char;
        }
    }
    return resultStr;
}


// console.log(jsonFormatter({ name: 'Dillon', instrument: 'bass', age: '26', address: {house: '540', street: '4th ave'}}))


