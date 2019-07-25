import React from 'react';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { RestLink } from 'apollo-link-rest';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { useStateValue } from '../Context';
import EndpointInput from '../Components/EndpointInput';
import QueryOutput from '../Components/QueryOutput';
import RunQueryButton from '../Components/RunQueryButton';
import QueryInput from '../Components/QueryInput';
// we may not need GQL imported here
// may not need below if using context

const restLink = new RestLink({
  uri: 'https://swapi.co/api/',
});

const client = new ApolloClient({
  link: restLink,
  // may not need below if using context:
  cache: new InMemoryCache(),
});


// const QueryQueryOutput = (props) => {
//   console.log('query inside component method :', props.query);
//   return (graphql(props.query)(QueryOutput));
// };


// if (query !== '') {
//   console.log('query, in if statement: ', query)
//   QueryQueryOutput = graphql(query)(QueryOutput);
// }


const QueriesContainer = () => {
  const [{ greeting, endpoint, query }, dispatch] = useStateValue();

  // error thrown because it evals before anything is in query
  let QueryQueryOutput;
  if (query !== '') {
    // if something is in query, assign QQO to output of query
    // had to pass on props with the props object. it "parses" bigass object
    // before it's passed on. one thing needed for dynamism: the name of the prop
    // on the data object. e.g. query luke { !!!PERSON }
    QueryQueryOutput = graphql(query, {
      props: ({ data }) => {
        if (data.loading) {
          return {
            loading: data.loading,
          };
        }
        if (data.error) {
          return {
            error: data.error,
          };
        }

        return {
          person: data.person,
          loading: false,
        };
      },
    })(QueryOutput);
  }
  console.log('in queries container');
  const SWQuery = gql`
    query luke {
      person @rest(type: "Person", path: "people/1/") {
        name
      }
    }
  `;

  // console.log(SWQuery);
  console.log('query, outside if statement:', query);

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
          newGreeting: 'hello Dillon',
        })}
      >
        Change the Greeting!
      </button>
      <EndpointInput />
      <QueryInput />
      {console.log('re-rendering')}
      {query !== '' && <QueryQueryOutput query={query} />}
      <RunQueryButton />
    </div>
  );
};
// we may need options object to handle props
// THIS WAS REMOVED: <QueryOutput />


const ApolloQueryContainer = () => (
  <ApolloProvider client={client}>
    <QueriesContainer />
  </ApolloProvider>
);

export default ApolloQueryContainer;
