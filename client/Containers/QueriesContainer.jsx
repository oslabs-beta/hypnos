import React from 'react';
import { graphql } from 'react-apollo';
import { useStateValue } from '../Context';
// NOTE: moved endpoint field to inside query
import QueryOutputDisplay from '../Components/QueryOutputDisplay';
import QueryInput from '../Components/QueryInput';
import * as types from '../Constants/actionTypes';

const QueriesContainer = () => {
  const [{ query, queryResultObject, queryGQLError }, dispatch] = useStateValue();

  // error thrown because it evals before anything is in query
  let OutputOfQuery;
  if (query !== '') {
    console.log('inside of QC, after if block');
    // if something is in query, assign QoQ to output of query
    // had to pass on props with the props object. it "parses" bigass object
    // before it's passed on. one thing needed for dynamism: the name of the prop
    // on the data object. e.g. query ditto { !!!POKEMON }
    
    // if query.definitions is an array with the number of queries. It should not be greater than 1
    if (query.definitions.length > 1) {
      console.log('in 2 query block, QC. GQL error: ', queryGQLError);
      // GraphQL can only run one query at a time, so even though this if statement block is to check for error, we need to send only one query to GQL so that the app doesn't break
      query.definitions = [query.definitions[0]];
      OutputOfQuery = graphql(query, {
        props: ({ data }) => {
          // to sanitize our context and render the error
          dispatch({
            type: types.GQL_ERROR,
            gqlError: 'Currently attempting to run multiple queries, but only one query, subscription, or mutation may be run at one time',
          });
        },
      })(QueryOutputDisplay);
    } else {
      console.log('in 1 query block, QC. GQL error: ', queryGQLError);
      OutputOfQuery = graphql(query, {
        // options: {
        //   errorPolicy: true,
        // },
        props: ({ data }) => {
          console.log(data, 'this is data inside output of query');
          // console.log(query, 'this is query inside output of query')
          if (data.loading) {
            return {
              loading: data.loading,
            };
          }
          if (data.error) {
            // console.log('error inside QC: ', data.error);
            return {
              error: data.error,
            };
          }
          // if query successful, instantiate result obj.
          const resultObj = {
            loading: false,
          };
          // separately assign queryResultVar to output obj
          resultObj[queryResultObject] = data[queryResultObject];
          return resultObj;
        },
        // render QOD with props from GraphQL query
      })(QueryOutputDisplay);
      // console.log(query, 'this is query after QOD')
    }
  }


  // NOTE: moved endpoint field to inside query
  // NOTE: ERRORS ARE MOSTLY BEING RENDERED HERE, NOT INSIDE QUERY OUTPUT DISPLAY.
  // ERRORS RENDERED INSIDE OF QOD ARE UNCAUGHT GQL ERRORS

  console.log('GQL error, in QC: ', queryGQLError);

  return (
    <section id="queries-container">
      <QueryInput />
      <article id="query-output">
        {query !== '' && <OutputOfQuery query={query} />}
        {queryGQLError !== '' && <p className="error">{queryGQLError}</p>}
      </article>
    </section>

  );
};

export default QueriesContainer;
