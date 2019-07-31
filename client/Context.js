/*
  Context to be used throughout the application
  Allows hooks to be utilized

  ! IMPORTANT NOTES FOR ADVANCED QUERIES
  ! QUERYOBJ.kind.definitions[0].name.kind.value = query name (e.g.)
  ! QUERYOBJ.kind.definitions[0].selectionSet.selections[0].name.value = valBeforeRest (e.g.)
  ! QUERYOBJ.definitions[""0""].selectionSet.selections[""0""].selectionSet.selections[""0""].directives[""0""].arguments[""0""].value.value === FIRST PARAM?
  ************************** */

import React, { createContext, useContext, useReducer } from 'react';
import * as types from './Constants/actionTypes';

export const StateContext = createContext();

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

const initialState = {
  query: '',
  queryResultObject: '',
  queryGQLError: '',
  // we should probably only need one of these, b/w url and endpoint
  endpoint: 'https://swapi.co/api/',
  // need to instantiate url or else query without a user input will not run
  // url can be deleted, pretty sure
  url: 'https://swapi.co/api/',
};

const reducer = (state, action) => {
  switch (action.type) {
    // think this can be deleted
    case types.ADD_URL:
      return {
        ...state,
        url: action.addURL,
      };
    case types.SUBMIT_ENDPOINT:
      return {
        ...state,
        // if user changes endpoint, want to make sure query is valid
        endpoint: action.submitEndpoint,
        query: '',
        queryResultObject: '',

      };
    case types.RUN_QUERY:
      // when query is run, on button press, endpoint is assigned the dynamically changing url
      console.log('query being run, obj: ', action.query);
      return {
        ...state,
        // if a query is run, that means no 404 happened
        queryGQLError: '',
        queryResultObject: action.queryResultObject,
        query: action.query,
        // we should probably only need one of these, b/w url and endpoint
        // this logic might not be needed
        endpoint: action.newEndpoint ? action.newEndpoint : state.endpoint,
      };
    // needs to send whatever was in intial state at the very beginning of the app
    case types.RESET_STATE:
      return initialState;
    case types.GQL_ERROR:
      console.log('GQL reducer fired.');
      return {
        ...state,
        // on a 404, reset query. no query is actually run
        query: '',
        queryResultObject: '',
        queryGQLError: action.gqlError,
      };
    default:
      return state;
  }
};
