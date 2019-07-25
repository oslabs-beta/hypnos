import React from 'react';
import { useStateValue } from '../Context';

const QueryOutput = (props) => {
  // just uncomment when you want you start using Menu!
  console.log('inside of queryoutput definition')
  const [{ greeting, endpoint }, dispatch] = useStateValue();

  const { data: { loading, error, person } } = props;

  if (loading) {
    return <h2>inside QueryOutput</h2>;
  }

  if (error) {
    return <h4>{error.message}</h4>
  }

  return (
    <div>
      <h2>inside QueryOutput</h2>
      <h3>
        {props.data}
      </h3>
    </div>
  )
}


export default QueryOutput;