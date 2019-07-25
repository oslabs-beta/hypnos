/*
  Context to be used throughout the application
  Allows hooks to be utilized

 ************************** */

import React, { createContext, useContext, useReducer } from 'react';
import gql from 'graphql-tag';

export const StateContext = createContext();

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

const initialState = {
  greeting: 'hello Sophie',
  query: '',
  queryVar: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'newGreeting':
      return {
        ...state,
        greeting: action.newGreeting,
      };
    case 'addURL':
      return {
        ...state,
        url: action.addURL,
      };
    case 'submitEndpoint':
      return {
        ...state,
        endpoint: action.submitEndpoint,
      };
    case 'addQuery':
      console.log('add query reducer fired');
      console.log('queryVar: ', action.queryVar);
      return {
        ...state,
        queryVar: action.queryVar,
        query: action.query,
      };
      // needs to send whatever was in intial state at the very beginning of the app
    case 'resetState':
      return {
        greeting: 'hello Sophie',
        query: '',
        queryVar: '',
      }
    default:
      return state;
  }
};
