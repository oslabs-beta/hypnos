export const queryMethodError =
  'Query method is invalid. Please double check your query on line 1.';
export const multipleQueriesError =
  'Currently attempting to run multiple queries, but only one query, subscription, or mutation may be run at one time.';
export const varBeforeRestError =
  'Variable before "@rest" cannot be blank. Please click reset and check line 3 of the example for reference.';
export const curlyBracketError = 'Query must be wrapped in curly brackets.';
export const queryFieldBlankError =
  'Query fields cannot be blank. Please click "Reset" and check line 4 of the example for reference.';
export const typeSyntaxError = 'Inside @rest, "type" must be followed by a colon (e.g. type:).';
export const noRestCallError = 'Query must have an @rest call.';
export const noPathOrTypeError =
  "@rest must have a 'path' and 'type' property. Please click reset to check the example for reference.";
export const endpointPath404Error = 'Endpoint is invalid. Please double check your endpoint.';
export const singleQuotesError = 'Please use double quotes (" ") instead of single quotes (\' \').';
export const badFieldError =
  'One or more of your query fields might be written incorrectly. Please double check them.';
export const unterminatedStringError =
  'An open string has not been closed with double quotes(" "). Please double check your query.';
export const genericError =
  'There was an uncaught error in your GraphQL syntax. Please double check your query.';
