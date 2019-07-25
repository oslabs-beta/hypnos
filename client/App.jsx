import React from 'react';
import { StateProvider } from './Context';
import QueriesContainer from './Containers/QueriesContainer';
import Menu from './Components/Menu';
import { RestLink } from 'apollo-link-rest';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { useStateValue } from './Context';



const App = () => {
  const [{ endpoint, url }, dispatch] = useStateValue();
  const restLink = new RestLink({
    uri: endpoint,
  });

  const client = new ApolloClient({
    link: restLink,
    // may not need below if using context:
    cache: new InMemoryCache(),
  });


  return (
    <div>
      <ApolloProvider client={client}>
        <QueriesContainer />
        <Menu />
      </ApolloProvider>
    </div>
  );
}

const statefulApp = () => {
  return (
    <StateProvider>
      <App />
    </StateProvider>
  )
}

export default statefulApp;