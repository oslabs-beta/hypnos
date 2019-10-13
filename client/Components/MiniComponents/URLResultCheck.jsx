import React from 'react';
import ErrorDisplay from './ErrorDisplay';

const URLResultCheck = props => {
  const { result } = props;
  return (
    <article>
      <ErrorDisplay
        extraSpace
        errorMessage="Note: The following data on the prop(s) below resemble a URL. If it is, you will have to reformat your query to access data at that API:"
      />
      <ul>
        {Object.keys(result).reduce((acc, curVal, idx) => {
          if (typeof result[curVal] === 'string' && result[curVal].includes('http')) {
            acc.push(<li key={`url-prop-${idx}`}>{curVal}</li>);
          }
          return acc;
        }, [])}
      </ul>
    </article>
  );
};

export default URLResultCheck;
