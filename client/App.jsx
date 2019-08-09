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
// import QueriesContainerManager from './Containers/QueriesContainerManager';
import QueriesContainer from './Containers/QueriesContainer';
import { StateProvider, useStateValue } from './Context';

import * as errorResponse from './Constants/errors/errorResponseStrings';
// import * as errorDispatchObj from './Constants/errors/errorDispatchObjects';
// using a proxy to get around CORS. We do not need a server.


const proxy = Number(process.env.IS_DEV) === 1 ? 'https://cors-anywhere.herokuapp.com/' : '';

const App = () => {
  const [{ endpoint }] = useStateValue();
  const [queriesTabs, setQueriesTabs] = useState({
    tabsList: [<Tab tab-id={0}>{`Title ${0}`}</Tab>, <Tab tab-id={1}>{`Title ${1}`}</Tab>],
    queriesContainers: [<TabPanel><QueriesContainer /></TabPanel>, <TabPanel><h2>Any content 2</h2></TabPanel>],
  });
  // instantiated errorLink
  // const httpLink = createHttpLink({ uri: proxy + endpoint });

  const restLink = new RestLink({
    // might be able to use custom fetch here for error checking?
    uri: proxy + endpoint,
    fetchOptions: {
      mode: 'no-cors',
    },
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    },
    // onError: ({ networkError, graphQLErrors }) => {
    //   console.log('graphQLErrors', graphQLErrors);
    //   console.log('networkError', networkError);
    // },
    customFetch: (uri, options) =>
      // console.log('in custom fetch');
      new Promise((resolve, reject) => {
        fetch(uri)
          .then((res) => {
            // const clone = res.clone();
            // console.log('in first then block, custom fetch');
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
      })
    ,
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


  const deleteTab = (tabId) => {
    console.log('tabsList, before filter: ', queriesTabs.tabsList);
    console.log('tabsList, before filter: ', queriesTabs.queriesContainers);
    // const newTabsList = curTabsList.slice(0).filter((el) => {
    //   console.log('all elements, tabsList, in filter: ', el);
    //   return 1;
    // });

    // console.log('queriesTabs, before filter: ', curQueriesContainers);
    // const newQueriesContainers = curQueriesContainers.slice(0).filter((el) => {
    //   // console.log('inside QC filter');
    //   // console.log(tabId !== +el.props['tab-panel-id']);
    //   console.log('all elements, queriesTabs, in filter:', el);
    //   return 1;
    // });
    // setQueriesTabs({
    //   tabsList: queriesTabs.tabsList.filter(el => tabId !== el.props['tab-id']),
    //   queriesContainers: queriesTabs.queriesContainers.filter(el => tabId !== el.props['tab-panel-id']),
    // });
  };

  const addNewTab = () => {
    console.log('adding tab. tabslist, before add: ', queriesTabs.tabsList);
    console.log('adding tab. queriesContainers, before add: ', queriesTabs.queriesContainers);
    const newTabsList = queriesTabs.tabsList.slice(0);
    const newQueriesContainers = queriesTabs.queriesContainers.slice(0);
    const newTabId = Number(newQueriesContainers.length);

    newTabsList.push(<Tab tab-id={newTabId}>
      {`Title ${newTabsList.length}`}
      <button type="button" onClick={() => deleteTab(newTabId)}>X</button>
    </Tab>);

    newQueriesContainers.push(
      <TabPanel tab-panel-id={newTabId}>
        <QueriesContainer key={`qc-${newQueriesContainers.length}`} />
      </TabPanel>,
    );

    setQueriesTabs({
      tabsList: newTabsList,
      queriesContainers: newQueriesContainers,
    });
  };


  // const deleteTab = (tabId) => {
  //   // console.log('tab id, inside delete: ', tabId);
  //   const newTabsList = queriesTabs.tabsList.slice(0).filter((el) => {
  //     // console.log('inside tabs list filter. tabId: ', +tabId);
  //     // console.log('inside tabs list filter. props tabId: ', +el.props['tab-id']);
  //     // console.log(tabId !== el.props['tab-id']);
  //     console.log('passing through filter. should be X times: ', queriesTabs.tabsList.length);
  //     return tabId !== +el.props['tab-id'];
  //   });
  //   console.log('new tabs list, inside delete, after filter: ', newTabsList);
  //   const newQueriesContainers = queriesTabs.queriesContainers.slice(0).filter(el =>
  //     // console.log('inside QC filter');
  //     // console.log(tabId !== +el.props['tab-panel-id']);
  //     tabId !== +el.props['tab-panel-id']);

  //   setQueriesTabs({
  //     tabsList: newTabsList,
  //     queriesContainers: newQueriesContainers,
  //   });
  // };


  // const tabsList = [<Tab>{`Title ${1}`}</Tab>, <Tab>{`Title ${2}`}</Tab>];
  // const queriesContainers = [<TabPanel><QueriesContainer /></TabPanel>, <TabPanel><h2>Any content 2</h2></TabPanel>];


  return (
    <section id="app">
      <ApolloProvider client={client}>
        <Header />
        <HistoryDisplay />
        {/* <QueriesContainer /> */}
        <Tabs>
          <TabList>
            {queriesTabs.tabsList}
            <button type="button" onClick={addNewTab}>New Tab</button>
          </TabList>
          {queriesTabs.queriesContainers}
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
