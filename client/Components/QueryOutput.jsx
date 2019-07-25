import React from 'react';
import { useStateValue } from '../Context';
import { jsonFormatter } from '../utils/jsonFormatter'

const QueryOutput = (props) => {
  const [{ greeting, endpoint, queryVar }, dispatch] = useStateValue();
  // pull props off
  const { loading, error } = props;
  const resultQueryVar = props[queryVar];

  if (loading) {
    return (<h2>Loading</h2>);
  }

  if (error) {
    return (<h4>{error.message}</h4>);
  }

  return (
    <div id="query-output">
      <h2>inside QueryOutput</h2>
      <h3>
        <pre>
          <code>
            {jsonFormatter(resultQueryVar)}
          </code>
        </pre>
      </h3>
    </div>
  );
};


export default QueryOutput;
