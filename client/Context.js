/*
  Context to be used throughout the application
  Allows hooks to be utilized

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
  queryResult404: '',
  endpoint: 'https://swapi.co/api/',
  // need to instantiate url or else query without a user input will not run
  url: 'https://swapi.co/api/',
};

const reducer = (state, action) => {
  switch (action.type) {
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
      console.log('query being run');
      return {
        ...state,
        queryResult404: '',
        queryResultObject: action.queryResultObject,
        query: action.query,
        endpoint: state.url ? state.url : state.endpoint,
      };
    // needs to send whatever was in intial state at the very beginning of the app
    case types.RESET_STATE:
      return initialState;
    case types.ERROR_404:
      return {
        ...state,
        queryResultObject: '',
        queryResult404: action.result404,
      };
    default:
      return state;
  }
};
