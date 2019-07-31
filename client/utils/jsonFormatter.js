/**
 * JSON FORMATTER FOR RESULT OF GQL QUERY. IMPORTED INTO QUERY OUTPUT DISPLAY
 *
 */

export const jsonFormatter = (obj) => {
  const strObj = JSON.stringify(obj);
  let resultStr = '';
  const tab = '  ';
  let nestLevel = 0;
  for (const char of strObj) {
    if (char === '{') {
      resultStr += char;
      resultStr += '\n';
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
};
