import React, { useState } from 'react';
import { useStateValue } from '../Context';

const EndpointInput = () => {
  const [{ endpoint, greeting, url }, dispatch] = useStateValue();

  const handleSubmit = () => {
    event.preventDefault();
    dispatch({
      type: 'submitEndpoint',
      submitEndpoint: url
    })
  }

  return (
    <div id="endpoint-input">
      <form onSubmit={() => handleSubmit()}>
        <textarea onChange={(e) => dispatch({
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