import React from 'react';
import { useStateValue } from '../Context';
import { jsonFormatter } from '../utils/jsonFormatter';

const QueryOutputDisplay = (props) => {
  const [{ endpoint, queryResultObject, queryResult404 }, dispatch] = useStateValue();
  // pull props off
  const { loading, error } = props;
  const result = props[queryResultObject] ? props[queryResultObject] : queryResult404 ;
  // console.log('result in queryoutputdisplay ', result)
  let testNull = Object.values(result).includes(null)

  // loading and error cases do not have query-output IDs
  if (loading) {
    return (<h2>Loading</h2>);
  }

  if (error) {
    return (<h4>{error.message}</h4>);
  }

  if (testNull) return (<h4>Error in GQL types</h4>)

  return (
    <>
      <h3>
        <pre>
          <code>
            {jsonFormatter(result)}
          </code>
        </pre>
      </h3>
    </>
  );
};


export default QueryOutputDisplay;
