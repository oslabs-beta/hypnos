import React from 'react';
import './StyleSheets/App.scss';

import { RestLink } from 'apollo-link-rest';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

import Header from './Components/Header';
import HistoryDisplay from './Components/HistoryDisplay';
import QueriesContainer from './Containers/QueriesContainer';
import { StateProvider, useStateValue } from './Context';
// using a proxy to get around CORS. We do not need a server.
const proxy = Number(process.env.IS_DEV) === 1 ? 'https://cors-anywhere.herokuapp.com/' : '';

const App = () => {
  const [{ endpoint }] = useStateValue();
  // instantiated errorLink
  // const httpLink = createHttpLink({ uri: proxy + endpoint });
  const errorLink = onError(({
    operation, response, graphQLErrors, networkError, forward,
  }) => {
    console.log('hey');
    if (graphQLErrors) {
      console.log('graphql error hit ', graphQLErrors);
    }
    if (networkError) {
      console.log('found network error: ', networkError);
    }
    console.log('response: ', response);
    // return forward(operation);
  });

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
    // credentials: 'include',
  });

  const client = new ApolloClient({
    // added errorLink here
    link: ApolloLink.from([restLink, errorLink]),
    cache: new InMemoryCache(),
    // handling errors on default
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'none',
      },
    },
  });

  return (
    <section id="app">
      <ApolloProvider client={client}>
        <Header />
        <HistoryDisplay />
        <QueriesContainer />
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
