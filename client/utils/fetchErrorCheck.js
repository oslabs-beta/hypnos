/**
* ERROR CHECKING FOR FETCH REQ IN QUERY INPUT. IMPORTED TO QI
*
*/

import * as types from '../Constants/actionTypes';

const fetchErrorCheck = (error, dispatch) => {
  // if Gql query does not start with 'query'
  if (error.message.slice(0, 29) === 'Syntax Error: Unexpected Name') {
    dispatch({
      type: types.GQL_ERROR,
      // line 1 is hardcoded in.
      gqlError: 'Query method is invalid. Please double check your query on line 1.',
    });
  } else if (error.message.slice(0, 12) === 'react-apollo') {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Currently attempting to run multiple queries, but only one query, subscription, or mutation may be run at one time',
    });
    // if the variable before @rest does not exist
    // ! TODO: this doesn't look like it's firing.
  } else if (error.message === 'Syntax Error: Expected Name, found @') {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Variable before "@rest" cannot be blank. Please click reset and check line 3 of the example for reference.',
    });
    // if query does not have proper curly brackets
    // ! TODO: this didn't look like it fired for inner right bracket being closed. Or final right bracket
  } else if (error.message === 'Syntax Error: Expected Name, found <EOF>' || error.message.slice(0, 24) === 'Syntax Error: Expected {' || error.message.slice(0, 26) === 'Syntax Error: Unexpected }') {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Query must be wrapped in curly brackets.',
    });
    // if the query fields are blank
    // ! TODO: this doesn't look like it's firing
  } else if (error.message === 'Syntax Error: Expected Name, found }') {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Query fields cannot be blank. Please click "Reset" and check line 4 of the example for reference.',
    });
  } else if (error.message.slice(0, 24) === 'Syntax Error: Expected :') {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Inside @rest, "type" must be followed by a colon (e.g. type:).',
    });
    //TypeError: Cannot read property '0' of null
  } else if (error.message === 'Cannot read property \'0\' of null') {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Query must have an @rest call.'
    })
    // ! TODO: this needs work. There are several errors that come through with the same error name and we'll have to figure out how best to parse them
    // ! fires if string after "type" is empty
  } else if (error.message.slice(0, 27) === 'Syntax Error: Expected Name') {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: '@rest must have a \'path\' and \'type\' property. Please click reset to check the example for reference.',
    });
  } else {
    console.log('Error in fetch: ', error);
  }
};

export default fetchErrorCheck;
