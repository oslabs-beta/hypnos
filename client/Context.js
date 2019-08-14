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


// experiment: to have robust tab history. not needed right now

// export const newUseStateValue = (requestedContext, tab) => {
//   const [state, dispatch] = useContext(StateContext);
//   // if just dispatch is needed
//   if (requestedContext === reqContext.dispatch) return [dispatch];
//   // if entire state is needed
//   if (requestedContext === reqContext.state) return [state, dispatch];
//   // if specific tab's info is needed, as well as possibility of whole state (e.g. isModalOpen)
//   if (requestedContext === reqContext.tab) return [state.tabIndices[tab], dispatch, state];
// };

// initial tab history and tabIndices not being used right now
// const initialTabHistory = {
//   savedQueryText: '',
//   savedEndpoint: '',
//   savedHeadersKey: '',
//   savedAPIKey: '',
//   savedHistoryTextValue: '',
// };

const initialEndpointHistory = {
  endpoint: 'https://pokeapi.co/api/v2/pokemon/',
  headers: {
    headersKey: '',
    apiKey: '',
  },
};

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
  endpointFromDB: '',
  isModalOpen: false,
  headersKey: '',
  apiKey: '',
  endpointHistory: {
    0: 'https://pokeapi.co/api/v2/pokemon/',
    // 999: initialEndpointHistory,
  },
  // not being used right now
  // tabIndices: {
  //   0: initialTabHistory,
  // },
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
      // console.log('run query fired, reducer');
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
        // TAB INDICIES NOT NEEDED RIGHT NOW
        // tabIndices: {
        //   ...state.tabIndices,
        //   // retains history except for current tab
        //   // ! NOTE: THIS IS ** 0 ** RIGHT NOW
        //   0: initialTabHistory,
        // },
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
        // ! original:
        endpoint: action.endpoint,
        // ! New:
        // endpointFromDB: action.endpoint,
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
    case types.OPEN_MODAL:
      // console.log('open modal fired');
      return {
        ...state,
        isModalOpen: true,
      };
    case types.CLOSE_MODAL:
      // console.log('close modal fired');
      return {
        ...state,
        apiKey: action.apiKey,
        headersKey: action.headerKey,
        isModalOpen: false,
      };
    // this case can probably be deleted
    case types.SET_NEW_TAB_STATE:
      return {
        ...state,
        // tab indices not needed righ tnow.
        // tabIndices: {
        //   ...state.tabIndices,
        //   [action.newTabIndex]: initialTabHistory,
        // },
      };
    // this case can probably be deleted
    case types.DELETE_TAB_STATE:
      const newState = Object.assign({}, state);
      delete newState.tabIndices[action.deletedTab];
      return newState;
    // this case can probably be deleted
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
