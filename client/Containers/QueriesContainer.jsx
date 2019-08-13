import React from 'react';
import { graphql } from 'react-apollo';
import { useStateValue } from '../Context';
// NOTE: moved endpoint field to inside query
import QueryOutputDisplay from '../Components/QueryOutputDisplay';
import QueryInput from '../Components/QueryInput';
import * as types from '../Constants/actionTypes';

// MOVED modal to inside endpoint field
// import APIModal from '../Components/APIKeyModal';
// Modal.setAppElement('#root')

const QueriesContainer = (props) => {
  const { stateTabReference } = props;

  const [{ query: { query, ranQueryTab }, queryResultObject, queryGQLError }, dispatch] = useStateValue();

  // error thrown because it evals before anything is in query
  let OutputOfQuery;
  if (query !== '') {
    // console.log('inside of QC, after if block');
    // if something is in query, assign QoQ to output of query
    // had to pass on props with the props object. it "parses" bigass object
    // before it's passed on. one thing needed for dynamism: the name of the prop
    // on the data object. e.g. query ditto { !!!POKEMON }

    // if query.definitions is an array with the number of queries. It should not be greater than 1
    if (query.definitions.length > 1) {
      // GraphQL can only run one query at a time, so even though this if statement block is to check for error, we need to send only one query to GQL so that the app doesn't break

      query.definitions = [query.definitions[0]];

      // seems to work now with new tabs, with dispatch moved out of props
      dispatch({
        type: types.GQL_ERROR,
        gqlError: 'Currently attempting to run multiple queries, but only one query, subscription, or mutation may be run at one time',
      });

      OutputOfQuery = graphql(query, {
        onError: (e) => {
          // not working
          console.log('Too many queries being run.', e);
        },
        props: ({ data }) => {
          // dispatch moved to before query being run

          if (data.loading) {
            return {
              stateTabReference,
              loading: data.loading,
            };
          }
          return {
            stateTabReference,
            error: 'Currently attempting to run multiple queries, but only one query, subscription, or mutation may be run at one time',
          };
        },
      })(QueryOutputDisplay);
    } else {
      OutputOfQuery = graphql(query, {
        // options: {
        //   errorPolicy: 'true',
        // },
        props: ({ data }) => {
          if (data.loading) {
            return {
              stateTabReference,
              loading: data.loading,
            };
          }
          if (data.error) {
            // console.log('error inside QC: ', data.error);
            return {
              stateTabReference,
              error: data.error,
            };
          }
          // if query successful, instantiate result obj.
          const resultObj = {
            stateTabReference,
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

  // too out this conditional from first item under article

  return (
    <section id="queries-container">
      <QueryInput stateTabReference={stateTabReference} />

      <article id="query-output">
        {query !== '' && stateTabReference === ranQueryTab && <OutputOfQuery query={query} />}
        {queryGQLError !== '' && <p className="error">{queryGQLError}</p>}
      </article>
    </section>

  );
};

export default QueriesContainer;
