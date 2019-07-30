import React from 'react';
import { useStateValue } from '../Context';
import { jsonFormatter } from '../utils/jsonFormatter';

const QueryOutputDisplay = (props) => {
  // ! TODO: MOVE ERROR CHECKING INTO A DIFFERENT FILE BECAUSE THIS IS A LOT
  const [{ endpoint, queryResultObject, queryResult404 }, dispatch] = useStateValue();
  // pull props off
  const { loading, error } = props;
  const result = props[queryResultObject] ? props[queryResultObject] : queryResult404;

  // checking if __typeName on the result object exists. If it doesn't, we send an error message
  // console.log(Object.keys(result).includes('__typename'))

  if (loading === false && !Object.keys(result).includes('__typename')) return <h4>Query does not have a properly formatted type within @rest.</h4>;

  // checking to see if there are any null values on the results object - means that the query field was improperly named or doesn't exist
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

  // checking if there are any values from our result that look like a url (surface level only)
  let urlAsPropCheck = false;
  if (typeof result === 'object') {
    urlAsPropCheck = Object.values(result).reduce((acc, curVal) => curVal.includes('http') || acc, false);
  }

  // if there are any values from our result that look like a url, make an array of LIs
  let urlPropNames;
  if (urlAsPropCheck) {
    urlPropNames = Object.keys(result).reduce((acc, curVal) => {
      if (result[curVal].includes('http')) {
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
  // need to figure out how to deal with this one Tuesday at 11:00 am
  // if (error.message === 'Network error: forward is not a function')
  if (error) {
    return (<h4>{error.message}</h4>);
  }

  if (testNull) {
    return (
      <>
        <h4 font="helevtica">Null values returned from query. Please check these properties:</h4>
        <ul font="helevtica">
          {nullVals}
        </ul>
      </>
    );
  }


  return (
    <>
      <article>
        <pre>
          <code>
            {jsonFormatter(result)}
          </code>
        </pre>
        <>
          {urlAsPropCheck
            ? (
              <>
                <p>Note: The following props respective data look like a URL. If it is, You will have to reformat your query to access data at that API:</p>
                <ul>
                  {urlPropNames}
                </ul>
              </>
            )
            : ''}
        </>
      </article>
    </>
  );
};


export default QueryOutputDisplay;
