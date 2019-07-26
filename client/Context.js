/*
  Context to be used throughout the application
  Allows hooks to be utilized

 ************************** */

import React, { createContext, useContext, useReducer } from 'react';

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
  endpoint: 'https://swapi.co/api/'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'addURL':
      return {
        ...state,
        url: action.addURL,
      };
    case 'submitEndpoint':
      return {
        ...state,
        endpoint: action.submitEndpoint,
        // if user changes endpoint, want to make sure query is valid
        query: '',
        queryResultObject: '',

      };
    case 'addQuery':
      console.log('add query reducer fired');
      console.log('queryResultObject: ', action.queryResultObject);
      return {
        ...state,
        queryResultObject: action.queryResultObject,
        query: action.query,
      };
    // needs to send whatever was in intial state at the very beginning of the app
    case 'resetState':
      return {
        query: '',
        queryResultObject: '',
        endpoint: 'https://swapi.co/api/',
      }
    default:
      return state;
  }
};
