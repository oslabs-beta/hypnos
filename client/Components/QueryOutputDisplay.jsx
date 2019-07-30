import React from 'react';
import { useStateValue } from '../Context';
import { jsonFormatter } from '../utils/jsonFormatter';

const QueryOutputDisplay = (props) => {
  const [{ queryResultObject, queryResult404 }] = useStateValue();
  // pull props off from graphQL query
  const { loading, error } = props;
  // this shouldn't be how this is rendered. it will only show up if comp is rendered
  const result = props[queryResultObject] ? props[queryResultObject] : queryResult404;
  // console.log('result in queryoutputdisplay ', result)
  const testNull = Object.values(result).includes(null);
  let nullVals;
  if (testNull) {
    nullVals = Object.keys(result).reduce((acc, curVal) => {
      if (result[curVal] === null) {
        acc.push(
          <li>
            {curVal}
          </li>,
        );
      }
      return acc;
    }, []);
  }

  // loading and error cases do not have query-output IDs
  if (loading) {
    return (<h4>Loading...</h4>);
    // return (<></>);
  }

  if (error) {
    return (<h4>{error.message}</h4>);
  }

  if (testNull) {
    return (
      <>
        <h4 font="helevtica">Null values returned from query. Please check these properties:</h4>
        <ul font="helevtica" >
          {nullVals}
        </ul>
      </>
    );
  }

  return (
    <>
      <h4>
        <pre>
          <code>
            {jsonFormatter(result)}
          </code>
        </pre>
      </h4>
    </>
  );
};


export default QueryOutputDisplay;
