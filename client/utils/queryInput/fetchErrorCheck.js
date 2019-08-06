/**
* ERROR CHECKING FOR FETCH REQ IN QUERY INPUT. IMPORTED TO HANDLE QUERY FETCH
*
*/

import * as types from '../../Constants/actionTypes';
import * as errorMsg from '../../Constants/errors/errorStrings';
import * as errorReponse from '../../Constants/errors/errorResponseStrings';
import * as dispatchObj from '../../Constants/errors/errorDispatchObjects';

const fetchErrorCheck = (error, dispatch) => {
  // if Gql query does not start with 'query'
  console.log('inside fetch error check: ', error);
  if (error.message.slice(0, errorMsg.queryMethodError.length) === errorMsg.queryMethodError) {
    dispatch(dispatchObj.queryMethodError);
    // throw new Error(errorReponse.queryMethodError);
  } else if (error.message.slice(0, errorMsg.multipleQueriesError.length) === errorMsg.multipleQueriesError) {
    dispatch(dispatchObj.multipleQueriesError);
    // throw new Error(errorReponse.multipleQueriesError);
    // if the variable before @rest does not exist
    // ! TODO: this doesn't look like it's firing.
  } else if (error.message === errorMsg.varBeforeRestError) {
    dispatch(dispatchObj.varBeforeRestError);
    // throw new Error(errorReponse.varBeforeRestError);
    // if query does not have proper curly brackets
    // ! TODO: this didn't look like it fired for inner right bracket being closed. Or final right bracket
  } else if (error.message === errorMsg.curlyBracketError1 || error.message.slice(0, errorMsg.curlyBracketError2.length) === errorMsg.curlyBracketError2 || error.message.slice(0, errorMsg.curlyBracketError3.length) === errorMsg.curlyBracketError3) {
    dispatch(dispatchObj.curlyBracketError);
    // throw new Error(errorReponse.curlyBracketError);
    // if the query fields are blank
    // ! TODO: this doesn't look like it's firing
  } else if (error.message === errorMsg.queryFieldBlankError) {
    dispatch(dispatchObj.queryFieldBlankError);
    // throw new Error(errorReponse.queryFieldBlankError);
  } else if (error.message.slice(0, errorMsg.typeSyntaxError.length) === errorMsg.typeSyntaxError) {
    dispatch(dispatchObj.typeSyntaxError);
    // throw new Error(errorReponse.typeSyntaxError);
    // TypeError: Cannot read property '0' of null
  } else if (error.message === errorMsg.noRestCallError) {
    dispatch(dispatchObj.noRestCallError);
    // throw new Error(errorReponse.noRestCallError);
    // ! TODO: this needs work. There are several errors that come through with the same error name and we'll have to figure out how best to parse them
    // ! fires if string after "type" is empty
  } else if (error.message.slice(0, errorMsg.noPathOrTypeError.length) === errorMsg.noPathOrTypeError) {
    dispatch(dispatchObj.noPathOrTypeError);
    // throw new Error(errorReponse.noPathOrTypeError);
  } else {
    console.log('Error in fetch: ', error);
    throw new Error('Error n fetch: ', error);
  }
};

export default fetchErrorCheck;
