import React from 'react';
import { useStateValue } from '../Context';

const EndpointInput = () => {
  // just uncomment when you want you start using Menu!
  const [{ endpoint, greeting }, dispatch] = useStateValue();


  return (
    <div>
      <button
        onClick={() => dispatch({
          type: 'addEndpoint',
          addEndpoint: 'www.swapi.com'
        })}
      >
        Change the endpoint!
      </button>
      <h3>
        {endpoint}
      </h3>
    </div>
  )
}


export default EndpointInput;