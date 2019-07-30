import * as types from '../Constants/actionTypes';

const fetchErrorCheck = (error, dispatch) => {
  if (error.message.slice(0, 29) === 'Syntax Error: Unexpected Name') {
    dispatch({
      type: types.GQL_ERROR,
      // line 1 is hardcoded in.
      result404: 'Query method is invalid. Please double check your query on line 1.',
    });
    // this needs work. There are several errors that come through with the same error name and we'll have to figure out how best to parse them
  } else if (error.message.slice(0, 2) === 'Syntax Error: Expected "Name".') {
    dispatch({
      type: types.GQL_ERROR,
      result404: '@rest must have a \'path\' and \'type\' property. Please click "Reset" to check the example for reference.',
    });
    // if query does not have proper curly brackets
  } else if (error.message === 'Syntax Error: Expected Name, found "<EOF>".' || error.message.slice(0, 24) === 'Syntax Error: Expected "{".' || error.message.slice(0, 26) === 'Syntax Error: Unexpected "}".') {
    dispatch({
      type: types.GQL_ERROR,
      result404: 'Query must be wrapped in curly brackets.',
    });
    // if the variable before @rest does not exist
  } else if (error.message === 'Syntax Error: Expected Name, found "@".') {
    dispatch({
      type: types.GQL_ERROR,
      result404: 'Variable before @rest cannot be blank. Please click "Reset" and check line 3 of the example for reference.',
    });
    // if the query fields are blank
  } else if (error.message === 'Syntax Error: Expected Name, found "}".') {
    dispatch({
      type: types.GQL_ERROR,
      result404: 'Query fields cannot be blank. Please click "Reset" and check line 4 of the example for reference',
    });
  } else {
    console.log('Error in fetch: ', error);
  }
};

export default fetchErrorCheck;
