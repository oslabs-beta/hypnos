import React from 'react';
import { graphql } from 'react-apollo';
import { useStateValue } from '../Context';
import EndpointField from '../Components/EndpointField';
import QueryOutputDisplay from '../Components/QueryOutputDisplay';
import QueryInput from '../Components/QueryInput';

const QueriesContainer = () => {
  const [
    {
      endpoint, query, queryResultObject, queryResult404,
    }, dispatch,
  ] = useStateValue();

  // error thrown because it evals before anything is in query
  let OutputOfQuery;
  if (query !== '') {
    // if something is in query, assign QQO to output of query
    // had to pass on props with the props object. it "parses" bigass object
    // before it's passed on. one thing needed for dynamism: the name of the prop
    // on the data object. e.g. query luke { !!!PERSON }
    OutputOfQuery = graphql(query, {
      props: ({ data }) => {
        // console.log(data, 'this is data inside output of query')
        // console.log(query, 'this is query inside output of query')
        if (data.loading) {
          return {
            loading: data.loading,
          };
        }
        if (data.error) {
          console.log('error is ', data.error);
          return {
            error: data.error,
          };
        }
        const resultObj = {
          loading: false,
        };
        resultObj[queryResultObject] = data[queryResultObject];
        return resultObj;
      },
    })(QueryOutputDisplay);
  }
  // const SWQuery = gql`
  // query luke {
  //   person @rest(type: "Person", path: "people/1/") {
  //     name
  //   }
  // }
  // `;

  return (
    <section id="queries-container">
      <EndpointField />
      <QueryInput />
      <article id="query-output">
        {query !== '' && <OutputOfQuery query={query} />}
        {/* {queryResult404 !== '' && <h1>Endpoint does not exist</h1>} */}
      </article>
    </section>

  );
};


// const ApolloQueryContainer = () => (
//   <ApolloProvider client={client}>
//     <QueriesContainer />
//   </ApolloProvider>
// );

// export default ApolloQueryContainer;
export default QueriesContainer;
