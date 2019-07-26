import React from 'react';
import "./StyleSheets/App.scss"
import QueriesContainer from './Containers/QueriesContainer';
import Menu from './Components/Menu';
import { RestLink } from 'apollo-link-rest';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { StateProvider } from './Context';
import { useStateValue } from './Context';


const App = () => {
  const [{ endpoint, url }, dispatch] = useStateValue();
  const restLink = new RestLink({
    uri: endpoint,
  });

  const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
  });


  return (
    <section id="app">
      <ApolloProvider client={client}>
        <Menu />
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
