/* eslint-disable no-restricted-syntax */
const nullChecker = (object) => {
  // pull keys off object passed in
  const objKeys = Object.keys(object);
  let nullCheck;
  // loop over object key by key
  for (const key of objKeys) {
    // if the value at the current key in the object is null, return true
    if (object[key] === null) return true;
    // in the case of an array of objects - iterate through array and recursively call nullChecker on all objects
    if (Array.isArray(object[key])) {
      for (const el of object[key]) {
        if (el === null) return true;
        if (!Array.isArray(el) && typeof el === 'object') {
          // if value at current key is an object, recurse and assign boolean result to a variable
          nullCheck = nullChecker(el);
          // check again for true
          if (nullCheck === true) return true;
        }
      }
    }
    if (!Array.isArray(object[key]) && typeof object[key] === 'object') {
      // if value at current key is an object, recurse and assign boolean result to a variable
      nullCheck = nullChecker(object[key]);
      // check again for true
      if (nullCheck === true) return true;
    }
  }

  // if made it out of the loop, nothing is null
  return false;
};


const objectTest = {
  name: 'Will',
  // testNull: {
  //   value: 12,
  //   moreNull: null,
  //   superNull: {
  //     pong: null,
  //     bed: 'yes',
  //   },
  // },
  // flatNull: null,
  // age: 90,
  test: {
    once: {
      array: [
        null,
      ],
    },
  },
};

const officeCheck = {
  id: 526,
  name: 'The Office',
  seasons: [
    {
      number: 1,
      image: null,
      summary: null,
      __typename: 'Season',
    },
    {
      number: 2,
      image: null,
      summary: null,
      __typename: 'Season',
    },
    {
      number: 3,
      image: null,
      summary: null,
      __typename: 'Season',
    },
    {
      number: 4,
      image: null,
      summary: null,
      __typename: 'Season',
    },
    {
      number: 5,
      image: null,
      summary: null,
      __typename: 'Season',
    },
    {
      number: 6,
      image: null,
      summary: null,
      __typename: 'Season',
    },
    {
      number: 7,
      image: null,
      summary: null,
      __typename: 'Season',
    },
    {
      number: 8,
      image: null,
      summary: null,
      __typename: 'Season',
    },
    {
      number: 9,
      image: null,
      summary: null,
      __typename: 'Season',
    },
  ],
  __typename: 'Show',
};


// should be boolean
// console.log(nullChecker(officeCheck));

export default nullChecker;
