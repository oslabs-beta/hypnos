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
  greeting: 'hello Sophie',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'newGreeting':
      return {
        ...state,
        greeting: action.newGreeting
      }
    case 'addURL':
      return {
        ...state,
        url: action.addURL
      }
    case 'submitEndpoint':
      return {
        ...state,
        endpoint: action.submitEndpoint
      }
    default:
      return state;
  }
}