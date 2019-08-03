/* eslint-disable no-restricted-syntax */

const nullChecker = (object) => {
  // pull keys off object passed in
  const objKeys = Object.keys(object);
  // loop over object key by key
  for (const key of objKeys) {
    // if the value at the current key in the object is null, return true
    if (object[key] === null) return true;
    if (!Array.isArray(object[key]) && typeof object[key] === 'object') {
      // if value at current key is an object, recurse and assign boolean result to a variable
      const nullCheck = nullChecker(object[key]);
      // check again for true
      if (nullCheck === true) {
        return true;
      }
    }
  }

  // if made it out of the loop, nothing is null
  return false;
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

// should be boolean
console.log(nullChecker(objectTest));

export default nullChecker;
