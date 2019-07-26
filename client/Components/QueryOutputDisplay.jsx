import React from 'react';
import { useStateValue } from '../Context';
import { jsonFormatter } from '../utils/jsonFormatter'

const QueryOutputDisplay = (props) => {
  const [{ endpoint, queryResultObject }, dispatch] = useStateValue();
  // pull props off
  const { loading, error } = props;
  const result = props[queryResultObject];

  if (loading) {
    return (<h2>Loading</h2>);
  }

  if (error) {
    return (<h4>{error.message}</h4>);
  }

  return (
    <div>
      <h3>
        <pre>
          <code>
            {jsonFormatter(result)}
          </code>
        </pre>
      </h3>
    </div>
  );
};


export default QueryOutputDisplay;
