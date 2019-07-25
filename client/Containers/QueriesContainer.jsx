import React from 'react';
import { graphql } from 'react-apollo';
import { useStateValue } from '../Context';
import EndpointInput from '../Components/EndpointInput';
import QueryOutput from '../Components/QueryOutput';
import RunQueryButton from '../Components/RunQueryButton';
import QueryInput from '../Components/QueryInput';

const QueriesContainer = () => {
  const [{ greeting, endpoint, query, queryVar }, dispatch] = useStateValue();

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
        const resultObj = {
          loading: false,
        }
        resultObj[queryVar] = data[queryVar];
        return resultObj;
      },
    })(QueryOutput);
  }
  // const SWQuery = gql`
    // query luke {
    //   person @rest(type: "Person", path: "people/1/") {
    //     name
    //   }
    // }
  // `;

  return (
    <div id="queries-container">
      <EndpointInput />
      <QueryInput />
      {query !== '' && <QueryQueryOutput query={query} />}
      {/* <RunQueryButton /> */}
    </div>
  );
};
// we may need options object to handle props
// THIS WAS REMOVED: <QueryOutput />


// const ApolloQueryContainer = () => (
//   <ApolloProvider client={client}>
//     <QueriesContainer />
//   </ApolloProvider>
// );

// export default ApolloQueryContainer;
export default QueriesContainer;
