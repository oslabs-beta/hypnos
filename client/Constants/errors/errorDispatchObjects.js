import { GQL_ERROR } from '../actionTypes';
import * as errorMsg from './errorStrings';

export const queryMethodErr = {
  type: GQL_ERROR,
  gqlError: errorMsg.queryMethodErr,
};

export const multipleQueriesError = {
  type: GQL_ERROR,
  gqlError: errorMsg.multipleQueriesError,
};

export const varBeforeRestError = {
  type: GQL_ERROR,
  gqlError: errorMsg.varBeforeRestError,
};

export const curlyBracketError = {
  type: GQL_ERROR,
  gqlError: errorMsg.curlyBracketError,
};

export const queryFieldBlankError = {
  type: GQL_ERROR,
  gqlError: errorMsg.queryFieldBlankError,
};

export const typeSyntaxError = {
  type: GQL_ERROR,
  gqlError: errorMsg.typeSyntaxError,
};

export const noRestCallError = {
  type: GQL_ERROR,
  gqlError: errorMsg.noRestCallError,
};

export const noPathOrTypeError = {
  type: GQL_ERROR,
  gqlError: errorMsg.noPathOrTypeError,
};
