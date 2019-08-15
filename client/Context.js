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


// const initialEndpointHistory = {
//   endpoint: 'https://pokeapi.co/api/v2/pokemon/',
//   headers: {
//     headersKey: '',
//     apiKey: '',
//   },
// };

const initialState = {
  query: {
    // MADE QUERY AN OBJ WITH QUERY PROP. ADDED RAN QUERYTAB ON IT TO KNOW WHERE QUERY CAME FROM
    query: '',
    ranQueryTab: -1,
  },
  queryResultObject: '',
  queryGQLError: '',
  // we should probably only need one of these, b/w url and endpoint
  endpoint: 'https://pokeapi.co/api/v2/pokemon/',
  // need to instantiate url or else query without a user input will not run
  // queries stored in db
  historyTextValue: '',
  historyIdx: 0,
  headersKey: '',
  apiKey: '',
  endpointFromDB: '',
  endpointHistory: {
    0: 'https://pokeapi.co/api/v2/pokemon/',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    // ! NOT BEING USED ANYMORE
    case types.SUBMIT_ENDPOINT:
      return {
        ...state,
        // if user changes endpoint, want to make sure query is valid
        endpoint: action.submitEndpoint,
        query: {
          query: '',
          ranQueryTab: -1,
        },
        queryResultObject: '',
        historyTextValue: '',
      };
    case types.RUN_QUERY:
      // when query is run, on button press, endpoint is assigned the dynamically changing url
      // console.log('run query fired, reducer', action);
      return {
        ...state,
        // if a query is run, that means no 404 happened
        queryGQLError: '',
        endpointFromDB: '',
        queryResultObject: action.queryResultObject,
        query: {
          query: Object.assign({}, action.query),
          ranQueryTab: action.ranQueryTab,
        },
        // sets endpoint history, for other tabs being able to run their old queries
        headersKey: action.newHeadersKey,
        apiKey: action.newAPIKey,
        endpointHistory: {
          ...state.endpointHistory,
          [action.ranQueryTab]: action.newEndpoint ? action.newEndpoint : state.endpoint,
        },
        endpoint: action.newEndpoint ? action.newEndpoint : state.endpoint,
        historyTextValue: '',
      };
    // needs to send whatever was in intial state at the very beginning of the app
    case types.RESET_STATE:
      return {
        ...initialState,
        // this might not be needed below
        endpointHistory: {
          ...state.endpointHistory,
          [action.currentTab]: 'https://pokeapi.co/api/v2/pokemon/',
        },
      };
    case types.GQL_ERROR:
      // console.log('gql error fired: ', action);
      return {
        ...state,
        // on a 404, reset query. no query is actually run
        query: {
          query: '',
          ranQueryTab: -1,
        },
        queryResultObject: '',
        queryGQLError: action.gqlError,
        historyTextValue: '',
      };
    case types.EDIT_QUERY_FROM_DB:
      return {
        ...initialState,
        historyTextValue: action.historyTextValue,
        historyIdx: action.currentTabID,
        endpoint: action.endpoint,
        endpointHistory: {
          ...state.endpointHistory,
          [action.currentTabID]: action.endpoint,
        },
      };
    case types.RESET_GET_QUERY:
      // console.log('running reset get query');
      return {
        ...state,
        historyTextValue: '',
        // reset to a number that will never exist
        historyIdx: -1,
      };
    default:
      return state;
  }
};
