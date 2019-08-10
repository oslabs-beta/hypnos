import React, { useState } from 'react';
import './StyleSheets/App.scss';

import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import { RestLink } from 'apollo-link-rest';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
// import { createHttpLink } from 'apollo-link-http';

import Header from './Components/Header';
import HistoryDisplay from './Components/HistoryDisplay';
import DeleteButton from './Components/MiniComponents/TabsDeleteButton';
import QueriesContainer from './Containers/QueriesContainer';
import { StateProvider, useStateValue } from './Context';

import * as errorResponse from './Constants/errors/errorResponseStrings';
// import * as errorDispatchObj from './Constants/errors/errorDispatchObjects';
// using a proxy to get around CORS. We do not need a server.


const proxy = Number(process.env.IS_DEV) === 1 ? 'https://cors-anywhere.herokuapp.com/' : '';

const App = () => {
  const [{ endpoint, apiKey, headersKey }] = useStateValue();
  // instantiated errorLink
  // const httpLink = createHttpLink({ uri: proxy + endpoint });

  const headersOptions = {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  };

  if (apiKey !== '' && headersKey !== '') {
    console.log('apiKey: ', apiKey);
    console.log('headersKey: ', headersKey);
    headersOptions[headersKey] = apiKey;
    console.log('headersOptions ', headersOptions);
  }

  const restLink = new RestLink({
    // might be able to use custom fetch here for error checking?
    uri: proxy + endpoint,
    fetchOptions: {
      mode: 'no-cors',
      headers: headersOptions,
    },
    // onError: ({ networkError, graphQLErrors }) => {
    //   console.log('graphQLErrors', graphQLErrors);
    //   console.log('networkError', networkError);
    // },
    customFetch: (uri, fetchOptions) =>
      // console.log('in custom fetch');
      new Promise((resolve, reject) => {
        fetch(uri, fetchOptions)
          .then((res) => {
            // const clone = res.clone();
            // console.log('in first then lock, custom fetch');
            if (res.status === 404) {
              // dispatch inside of here seems to break it
              // dispatch(errorDispatchObj.endpointPath404Error);
              reject(new Error(errorResponse.endpointPath404Error));
            }
            // console.log('clone.json: ', clone.json());
            else return resolve(res);
          })
          // .then((data) => {
          //   console.log('data in 2nd then block: ', data);
          //   return resolve(data);
          // })
          .catch((e) => {
            // console.log('error in custom fetch');
            reject('error in custom fetch: ', e);
          });
      }),
    // credentials: 'include',
  });

  // error link, which isn't actually being triggered at all
  const errorLink = onError(({
    graphQLErrors, networkError, operation, response, forward,
  }) => {
    // operation and response are other props in the onError obj
    // console.log('operation in errorLink: ', operation);
    // console.log('response in errorLink: ', response);
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ));
    }
    if (networkError) console.log('Network Error: ', networkError);

    // forward(operation);
  });


  // const httpLink = createHttpLink(proxy + endpoint);

  const client = new ApolloClient({
    // added errorLink here
    link: ApolloLink.from([errorLink, restLink]),
    cache: new InMemoryCache(),
    // handling errors on default
    // defaultOptions: {
    //   watchQuery: {
    //     fetchPolicy: 'cache-and-network',
    //     errorPolicy: 'all',
    //   },
    //   query: {
    //     fetchPolicy: 'cache-and-network',
    //     errorPolicy: 'all',
    //   },
    // },
    // onError: ({ networkError, graphQLErrors }) => {
    //   console.log('graphQLErrors', graphQLErrors);
    //   console.log('networkError', networkError);
    // },
  });

  // rendering tabs inside render method, based on tabsListLabels, just nums in an array
  const [queriesTabs, setQueriesTabs] = useState({
    tabsListLabels: [0],
  });
  const [currentTab, setCurrentTab] = useState({ tabIndex: 0 });

  const deleteTab = (tabId) => {
    // delete tabs by checking tabId, which is passed as a prop upon creation of tab
    // let tabIdx;
    setQueriesTabs({
      tabsListLabels: queriesTabs.tabsListLabels.filter((el, idx) => el !== tabId),
      // if (el === tabId) tabIdx = idx;
    });

    // change tab if current tab was deleted tab not working
    // if (currentTab.tabIndex === tabIdx) setCurrentTab({ tabIndex: tabIdx - 2 });
  };

  const addNewTab = () => {
    // push new item (just a num) to tabsListLabels
    const newTabsListLabels = queriesTabs.tabsListLabels;

    newTabsListLabels.push(newTabsListLabels.length);

    setQueriesTabs({
      tabsListLabels: newTabsListLabels,
    });
  };

  return (
    <section id="app">
      <ApolloProvider client={client}>
        <Header />
        <HistoryDisplay />
        {/* <QueriesContainer /> */}
        <Tabs selectedIndex={currentTab.tabIndex} onSelect={tabIndex => setCurrentTab({ tabIndex })}>
          <TabList>
            {queriesTabs.tabsListLabels.map((el, idx) => (idx !== 0
              ? (
                <Tab key={`tab-${el}`} tab-id={el}>
                  {`Title ${el}`}
                  <DeleteButton key={`del-btn-${el}`} tabId={el} deleteTab={deleteTab} />
                </Tab>
              )
              : (
                <Tab key={`tab-${el}`} tab-id={el}>
                  {`Title ${el}`}
                </Tab>
              )))}
            {/* {<button type="button" onClick={deleteTab}>x</button>} */}
            {<button type="button" onClick={addNewTab}>New Tab</button>}
          </TabList>
          {/* {queriesTabs.queriesContainers} */}
          {queriesTabs.tabsListLabels.map((el, idx) => <TabPanel key={`tab-panel-${el}`} tab-panel-id={el}><QueriesContainer key={`qc-${el}`} /></TabPanel>)}
        </Tabs>
      </ApolloProvider>
    </section>
  );
};

const statefulApp = () => (
  <StateProvider>
    <App />
  </StateProvider>
);

export default statefulApp;
