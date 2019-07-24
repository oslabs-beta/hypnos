import React from 'react';
import { useStateValue } from '../Context';

const QueryOutput = () => {
  // just uncomment when you want you start using Menu!
  const [{ greeting, endpoint }, dispatch] = useStateValue();


  return (
    <div>
      <h2>inside QueryOutput</h2>
      <h3>
        {endpoint}
      </h3>
    </div>
  )
}


export default QueryOutput;