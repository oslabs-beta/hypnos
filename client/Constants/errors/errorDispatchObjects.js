import { GQL_ERROR } from '../actionTypes';
import * as errorResponse from './errorResponseStrings';

class ErrorDispatch {
  constructor(errorMessage) {
    this.type = GQL_ERROR;
    this.gqlError = errorMessage;
  }
}

export const queryMethodError = new ErrorDispatch(errorResponse.queryMethodError);
export const multipleQueriesError = new ErrorDispatch(errorResponse.multipleQueriesError);
export const varBeforeRestError = new ErrorDispatch(errorResponse.varBeforeRestError);
export const curlyBracketError = new ErrorDispatch(errorResponse.curlyBracketError);
export const queryFieldBlankError = new ErrorDispatch(errorResponse.queryFieldBlankError);
export const typeSyntaxError = new ErrorDispatch(errorResponse.typeSyntaxError);
export const noRestCallError = new ErrorDispatch(errorResponse.noRestCallError);
export const noPathOrTypeError = new ErrorDispatch(errorResponse.noPathOrTypeError);
export const endpointPath404Error = new ErrorDispatch(errorResponse.endpointPath404Error);
export const singleQuotesError = new ErrorDispatch(errorResponse.singleQuotesError);
export const badFieldError = new ErrorDispatch(errorResponse.badFieldError);
export const unterminatedStringError = new ErrorDispatch(errorResponse.unterminatedStringError);

// BELOW: Old way to make error dispatches, before constructor


// export const queryMethodError = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.queryMethodError,
// };


// export const multipleQueriesError = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.multipleQueriesError,
// };


// export const varBeforeRestError = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.varBeforeRestError,
// };


// export const curlyBracketError = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.curlyBracketError,
// };


// export const queryFieldBlankError = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.queryFieldBlankError,
// };


// export const typeSyntaxError = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.typeSyntaxError,
// };


// export const noRestCallError = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.noRestCallError,
// };


// export const noPathOrTypeError = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.noPathOrTypeError,
// };


// export const endpointPath404Error = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.endpointPath404Error,
// };


// export const singleQuotesError = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.singleQuotesError,
// };


// export const badFieldError = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.badFieldError,
// };


// export const unterminatedStringError = {
//   type: GQL_ERROR,
//   gqlError: errorResponse.unterminatedStringError,
// };
