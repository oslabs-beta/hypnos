import React, { useState } from 'react';
import { useStateValue } from '../Context';
import { jsonFormatter } from '../utils/queryOutputDisplay/jsonFormatter';
import nullChecker from '../utils/queryOutputDisplay/nullChecker';
// import nullResultChecker from '../utils/queryOutputDisplay/nullResultChecker';

import ErrorDisplay from './MiniComponents/ErrorDisplay';
import URLResultCheck from './MiniComponents/URLResultCheck';
import NullResultCheck from './MiniComponents/NullResultCheck';

const QueryOutputDisplay = props => {
  // ! TODO: MOVE ERROR CHECKING INTO A DIFFERENT FILE BECAUSE THIS IS A LOT
  const [{ queryResultObject, queryGQLError }] = useStateValue();
  const [isHovering, toggleHover] = useState(false);
  // pull props off from GQL query running
  const { loading, error } = props;

  // if the current tab matches the tab from which the query was run, show contents. if not, make invisible
  // const styleObj = { visibility: ranQueryTab === stateTabReference ? 'visible' : 'hidden' };

  // result is assigned either the successful query data or an error string
  const result = props[queryResultObject] ? props[queryResultObject] : queryGQLError;

  // checking if __typeName on the result object exists. If it doesn't, we send an error message
  if (loading === false) {
    // console.log(result);
    // if result comes back as an array - checks 0th index, will not work for nested result arrays
    if (Array.isArray(result)) {
      if (!result[0].__typename) {
        return (
          <ErrorDisplay errorMessage="Query does not have a properly formatted type within @rest." />
        );
      }
      // if result comes back as a flat object
    } else if (!Object.keys(result).includes('__typename')) {
      return (
        <ErrorDisplay errorMessage="Query does not have a properly formatted type within @rest." />
      );
    }
  }

  // checking to see if there are any null values on the results object
  // if so, means that the query field was improperly named or doesn't exist

  // ! NOTE: NEEDS TO ACCOUNT FOR ARRAYS, AS WELL AS NULL RESULT CHECKER
  // ! BUT DOES IT?
  const testNull = nullChecker(result);

  // checking if there are any values from our result that look like a url (surface level only)
  let urlAsPropCheck = false;
  // result will either be an object or string (error message)
  if (typeof result === 'object') {
    // ensures curVal is not null and that it is a string. a URL-like response
    // will only be a string
    // NOT NESTED
    urlAsPropCheck = Object.values(result).reduce((acc, curVal) => {
      if (curVal !== null && typeof curVal === 'string') return curVal.includes('http') || acc;
      return acc;
    }, false);
  }

  // if there are any values from our result that look like a url, make an array of LIs
  // now rendered inside return

  // loading and error cases do not have query-output IDs
  // loading and error come from GraphQL query result

  // ! TEST: for local state of result. if it's an empty string, query hasn't been run
  if (loading) {
    return (
      <div className="lds-circle">
        <div />
      </div>
    );
  }

  // need to figure out how to deal with this one -- 7/30 at 11:00 am
  // if (error.message === 'Network error: forward is not a function')

  // any error from a graphql query that's not already accounted for is rendered here
  if (error) {
    if (error.message === 'Network error: forward is not a function') {
      return (
        <ErrorDisplay
          errorMessage={
            "Query submitted did not have '@rest' formatted correctly. For an example, press 'reset' and refer to line 3."
          }
        />
      );
    }
    return <ErrorDisplay errorMessage={error.message} />;
  }

  return (
    <>
      <>
        {testNull && (
          <NullResultCheck result={result} isHovering={isHovering} toggleHover={toggleHover} />
        )}
      </>
      <>{urlAsPropCheck && <URLResultCheck result={result} />}</>
      <article>
        <pre>
          <code>{jsonFormatter(result)}</code>
        </pre>
        <br />
        <br />
      </article>
    </>
  );
};

export default QueryOutputDisplay;
