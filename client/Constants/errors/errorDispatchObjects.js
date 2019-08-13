import { GQL_ERROR } from '../actionTypes';
import * as errorResponse from './errorResponseStrings';

export const queryMethodError = {
  type: GQL_ERROR,
  gqlError: errorResponse.queryMethodError,
};

export const multipleQueriesError = {
  type: GQL_ERROR,
  gqlError: errorResponse.multipleQueriesError,
};

export const varBeforeRestError = {
  type: GQL_ERROR,
  gqlError: errorResponse.varBeforeRestError,
};

export const curlyBracketError = {
  type: GQL_ERROR,
  gqlError: errorResponse.curlyBracketError,
};

export const queryFieldBlankError = {
  type: GQL_ERROR,
  gqlError: errorResponse.queryFieldBlankError,
};

export const typeSyntaxError = {
  type: GQL_ERROR,
  gqlError: errorResponse.typeSyntaxError,
};

export const noRestCallError = {
  type: GQL_ERROR,
  gqlError: errorResponse.noRestCallError,
};

export const noPathOrTypeError = {
  type: GQL_ERROR,
  gqlError: errorResponse.noPathOrTypeError,
};

export const endpointPath404Error = {
  type: GQL_ERROR,
  gqlError: errorResponse.endpointPath404Error,
};

export const singleQuotesError = {
  type: GQL_ERROR,
  gqlError: errorResponse.singleQuotesError,
};
