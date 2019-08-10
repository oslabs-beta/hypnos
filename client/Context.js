/*
  Context to be used throughout the application
  Allows hooks to be utilized

  ! IMPORTANT NOTES FOR ADVANCED QUERIES
  ! THESE TARGET SOME QUERY VARS
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
  endpoint: 'https://pokeapi.co/api/v2/pokemon/',
  // need to instantiate url or else query without a user input will not run
  // queries stored in db
  historyTextValue: '',
  isModalOpen: false,
  headersKey: '',
  apiKey: '',
};

const iniialState2 = {
  tabIndices: {
    0: initialState,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.SUBMIT_ENDPOINT:
      return {
        ...state,
        // if user changes endpoint, want to make sure query is valid
        endpoint: action.submitEndpoint,
        query: '',
        queryResultObject: '',
        historyTextValue: '',
      };
    case types.RUN_QUERY:
      // when query is run, on button press, endpoint is assigned the dynamically changing url
      // console.log('run query fired, reducer');
      return {
        ...state,
        // if a query is run, that means no 404 happened
        queryGQLError: '',
        queryResultObject: action.queryResultObject,
        query: Object.assign({}, action.query),
        // we should probably only need one of these, b/w url and endpoint
        // this logic might not be needed
        endpoint: action.newEndpoint ? action.newEndpoint : state.endpoint,
        historyTextValue: '',
      };
    // needs to send whatever was in intial state at the very beginning of the app
    case types.RESET_STATE:
      return {
        ...initialState,
      };
    case types.GQL_ERROR:
      // console.log('gql error fired: ', action);
      return {
        ...state,
        // on a 404, reset query. no query is actually run
        query: '',
        queryResultObject: '',
        queryGQLError: action.gqlError,
        historyTextValue: '',
      };
    case types.GET_QUERY:
      // console.log('in GET_QUERY');
      return {
        ...initialState,
        historyTextValue: action.historyTextValue,
        endpoint: action.endpoint,
      };
    case types.RESET_GET_QUERY:
      // console.log('running reset get query');
      return {
        ...state,
        historyTextValue: '',
      };
    case types.OPEN_MODAL:
      console.log('open modal fired');
      return {
        ...state,
        isModalOpen: true,
      };
    case types.CLOSE_MODAL:
      console.log('close modal fired');
      return {
        ...state,
        apiKey: action.apiKey,
        headersKey: action.headerKey,
        isModalOpen: false,
      };
    case types.NEW_TAB_STATE:
      const newTabState = {
        ...state,
        tabIndices: {
          ...state.tabIndices,
        },
      };
      newTabState[action.newTabIndex] = initialState;
      return newTabState;
    default:
      return state;
  }
};
