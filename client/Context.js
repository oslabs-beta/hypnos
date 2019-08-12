/*
  Context to be used throughout the application
  Allows hooks to be utilized

  ************************** */

import React, { createContext, useContext, useReducer } from 'react';
import * as types from './Constants/actionTypes';
import * as reqContext from './Constants/requestedContext';

export const StateContext = createContext();

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
export const newUseStateValue = (requestedContext, tab) => {
  const [state, dispatch] = useContext(StateContext);
  // if just dispatch is needed
  if (requestedContext === reqContext.dispatch) return [dispatch];
  // if entire state is needed
  if (requestedContext === reqContext.state) return [state, dispatch];
  // if specific tab's info is needed, as well as possibility of whole state (e.g. isModalOpen)
  if (requestedContext === reqContext.tab) return [state.tabIndices[tab], dispatch, state];
};

const initialTabHistory = {
  savedQueryText: '',
  savedEndpoint: '',
  savedHeadersKey: '',
  savedAPIKey: '',
  savedHistoryTextValue: '',
};

const initialState = {
  query: {
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
  isModalOpen: false,
  headersKey: '',
  apiKey: '',
  tabIndices: {
    0: initialTabHistory,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
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
      // console.log('run query fired, reducer');
      return {
        ...state,
        // if a query is run, that means no 404 happened
        queryGQLError: '',
        queryResultObject: action.queryResultObject,
        query: {
          query: Object.assign({}, action.query),
          ranQueryTab: action.ranQueryTab,
        },
        // we should probably only need one of these, b/w url and endpoint
        // this logic might not be needed
        endpoint: action.newEndpoint ? action.newEndpoint : state.endpoint,
        historyTextValue: '',
      };
    // needs to send whatever was in intial state at the very beginning of the app
    case types.RESET_STATE:
      return {
        ...initialState,
        tabIndices: {
          ...state.tabIndices,
          // retains history except for current tab
          // ! NOTE: THIS IS ** 0 ** RIGHT NOW
          0: initialTabHistory,
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
    case types.GET_QUERY:
      console.log('in GET_QUERY. endpoint coming in: ', action.endpoint);
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
    case types.SET_NEW_TAB_STATE:
      return {
        ...state,
        tabIndices: {
          ...state.tabIndices,
          [action.newTabIndex]: initialTabHistory,
        },
      };
    case types.DELETE_TAB_STATE:
      const newState = Object.assign({}, state);
      delete newState.tabIndices[action.deletedTab];
      return newState;
    case types.SAVE_TAB_STATE:
      return {
        ...state,
        tabIndices: {
          ...state.tabIndices,
        },
      };
    default:
      return state;
  }
};
