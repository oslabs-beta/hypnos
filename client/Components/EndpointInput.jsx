import React, { useState } from 'react';
import { useStateValue } from '../Context';

const EndpointInput = () => {
  // just uncomment when you want you start using Menu!
  const [{ endpoint, greeting, url }, dispatch] = useStateValue();

  const handleSubmit = () => {
    event.preventDefault();
    console.log(url, 'this is textValue')
    dispatch({
      type: 'submitEndpoint',
      submitEndpoint: url
    })
  }

  return (
    <div>
      <form onSubmit={() => handleSubmit()}>
        <textarea  onChange={(e) => dispatch({
          type: 'addURL',
          addURL: e.target.value
        })} />
        <input type="submit" value="Submit" />
      </form>
      <h3>
        {endpoint}
      </h3>
    </div>
  )
}


export default EndpointInput;