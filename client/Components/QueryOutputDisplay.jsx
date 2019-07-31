import React from 'react';
import { useStateValue } from '../Context';
import { jsonFormatter } from '../utils/jsonFormatter';

const QueryOutputDisplay = (props) => {
  // ! TODO: MOVE ERROR CHECKING INTO A DIFFERENT FILE BECAUSE THIS IS A LOT
  const [{ endpoint, queryResultObject, queryGQLError }, dispatch] = useStateValue();
  // pull props off
  const { loading, error } = props;
  const result = props[queryResultObject] ? props[queryResultObject] : queryGQLError;

  // checking if __typeName on the result object exists. If it doesn't, we send an error message
  // console.log(Object.keys(result).includes('__typename'))

  if (loading === false && !Object.keys(result).includes('__typename')) return <h4>Query does not have a properly formatted type within @rest.</h4>;

  // checking to see if there are any null values on the results object - means that the query field was improperly named or doesn't exist
  const testNull = Object.values(result).includes(null);
  let nullVals;
  if (testNull) {
    console.log('inside url as prop builder, Obj vals of result: ', Object.values(result));
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
    console.log('inside url as prop, Obj vals of result: ', Object.values(result));
    urlAsPropCheck = Object.values(result).reduce((acc, curVal) => {
      if (curVal !== null && typeof curVal === 'string') return curVal.includes('http') || acc;
      return acc;
    }, false);
  }

  // if there are any values from our result that look like a url, make an array of LIs
  let urlPropNames;
  if (urlAsPropCheck) {
    console.log('inside url as prop builder, Obj vals of result: ', Object.values(result));
    urlPropNames = Object.keys(result).reduce((acc, curVal) => {
      if (typeof result[curVal] === 'string' && result[curVal].includes('http')) {
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
    return (<div className="lds-circle"><div></div></div>);

    // return (<></>);
  }
  // need to figure out how to deal with this one Tuesday at 11:00 am
  // if (error.message === 'Network error: forward is not a function')
  if (error) {
    if (error.message === 'Network error: forward is not a function'){
      return(<p>Query submitted did not have '@rest' formatted correctly. For an example, press 'reset' and refer to line 3.</p>)
    } else  {
      return (<p>{error.message}</p>);
    }
  }

  if (testNull) {
    return (
      <>
        <p font="helevtica">Null values returned from query. Please check these properties:<br></br><br></br></p>
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
        <br></br><br></br>
        <>
          {urlAsPropCheck
            ? (
              <>
                <p>Note: The following data on the prop(s) below resemble a URL. If it is, you will have to reformat your query to access data at that API:<br></br><br></br></p>
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
