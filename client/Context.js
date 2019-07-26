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
  endpoint: 'https://swapi.co/api/',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'addURL':
      // console.log('new url inside reducer: ', action.addURL);
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
    case 'runQuery':
      // console.log('add query reducer fired');
      // console.log('state.url: ', state.url);
      // when query is run, on button press, endpoint is assigned the dynamically changing url
      return {
        ...state,
        queryResultObject: action.queryResultObject,
        query: action.query,
        endpoint: state.url ? state.url : state.endpoint,
      };
    // needs to send whatever was in intial state at the very beginning of the app
    case 'resetState':
      return initialState;
      // return {
      //   greeting: 'hello Sophie',
      //   query: '',
      //   queryVar: '',
      //   endpoint: 'https://swapi.co/api/',
      // };
    default:
      return state;
  }
};
