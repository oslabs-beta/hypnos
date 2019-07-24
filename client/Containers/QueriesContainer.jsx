import React from 'react';
import { useStateValue } from '../Context';
import EndpointInput from '../Components/EndpointInput';
import QueryOutput from '../Components/QueryOutput';
import RunQueryButton from '../Components/RunQueryButton';
import QueryInput from "../Components/QueryInput";
import { ApolloProvider } from 'react-apollo';
import { RestLink } from "apollo-link-rest";
import { ApolloClient } from "apollo-client";
//may not need below if using context
import { InMemoryCache } from "apollo-cache-inmemory";

const restLink = new RestLink({
  uri: 'https://swapi.co/api',
});

const client = new ApolloClient({
  link: restLink,
  //may not need below if using context:
  cache: new InMemoryCache
})


const QueriesContainer = () => {
  const [{ greeting }, dispatch] = useStateValue();

  return (
    <div>
      {/* <h1>
        {greeting}
      </h1> */}
      <button
        onClick={() => dispatch({
          type: 'newGreeting',
          newGreeting: 'hello Dillon'
        })}
      >
        Change the Greeting!
      </button> */}
      <EndpointInput />
      <QueryInput />
      <QueryOutput />
      <RunQueryButton />
    </div>
  );
}

const ApolloQueryContainer = () => (
  <ApolloProvider client={client}>
    <QueriesContainer />
  </ApolloProvider>
)

export default ApolloQueryContainer;