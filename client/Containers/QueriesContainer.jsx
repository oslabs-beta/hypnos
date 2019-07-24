import React from 'react';
import { useStateValue } from '../Context';
import EndpointInput from '../Components/EndpointInput';
import QueryOutput from '../Components/QueryOutput';
import RunQueryButton from '../Components/RunQueryButton';
import QueryInput from "../Components/QueryInput";
import { ApolloProvider, graphql } from 'react-apollo';
// we made not need GQL imported here
// import gql from 'graphql-tag';
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
  const [{ greeting, endpoint, query }, dispatch] = useStateValue();

  let QueryQueryOutput;
  if (query !== '') {
    QueryQueryOutput = graphql(query)(QueryOutput);
  }

  return (
    <div>
      <h1>
        {endpoint}
      </h1>
      <h1>
        {greeting}
      </h1>
      <button
        onClick={() => dispatch({
          type: 'newGreeting',
          newGreeting: 'hello Dillon'
        })}
      >
        Change the Greeting!
      </button>
      <EndpointInput />
      <QueryInput />
      {/* <QueryQueryOutput /> */}
      <RunQueryButton />
    </div>
  );
}
// we may need options object to handle props
// THIS WAS REMOVED: <QueryOutput />


const ApolloQueryContainer = () => (
  <ApolloProvider client={client}>
    <QueriesContainer />
  </ApolloProvider>
)

export default ApolloQueryContainer;