import React from 'react';
import './StyleSheets/App.scss';
import { RestLink } from 'apollo-link-rest';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import Header from './Components/Header';
import QueriesContainer from './Containers/QueriesContainer';
import { StateProvider, useStateValue } from './Context';
// using a proxy to get around CORS. WE PROBABLY NEED A SERVER NOW.
const proxy = 'https://cors-anywhere.herokuapp.com/';


const App = () => {
  const [{ endpoint }] = useStateValue();
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
    link: restLink,
    cache: new InMemoryCache(),

  });


  return (
    <section id="app">
      <ApolloProvider client={client}>
        <Header />
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
