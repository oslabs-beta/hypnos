/* eslint-disable no-restricted-syntax */
import React from 'react';

const nullResultCheck = (object, errorPath = '') => {
  // instantiate output variable
  const nullVals = [];
  // pull keys off object passed in
  const objKeys = Object.keys(object);
  // loop over object key by key
  for (const key of objKeys) {
    // if the value at the current key in the object is null, add to result array
    if (object[key] === null) nullVals.push(<li>{errorPath + key}</li>);
    // if value at current key is an object, recurse and assign to a variable
    else if (!Array.isArray(object[key]) && typeof object[key] === 'object') {
      const nullPath = nullResultCheck(object[key], `${errorPath + key} => `);
      // ensure nullPath is not an empty string, in that there's a new nullpath to add
      if (nullPath !== '') {
        // nullVals is always an array. so if path is an array of strings, flatten vals out
        // before pushing
        nullPath.forEach((curNullPath) => {
          nullVals.push(
            <li>
              {curNullPath}
            </li>,
          );
        });
        // nullVals.push(...nullPath);
      }
    }
  }

  // return flat array of string(s)
  return nullVals;
};


const objectTest = {
  name: 'Will',
  testNull: {
    value: 12,
    moreNull: null,
    superNull: {
      pong: null,
      bed: 'yes',
    },
  },
  flatNull: null,
  age: 90,
};

// should be array of strings
// console.log(nullResultCheck(objectTest));


export default nullResultCheck;
