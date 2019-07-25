import React, { useState } from 'react';
import { useStateValue } from '../Context';

const EndpointInput = () => {
  const [{ endpoint, greeting, url }, dispatch] = useStateValue();
  // can be streamlined to not use local state, and maybe
  // one less value from context
  const [urlInput, setUrlInput] = useState('');

  const handleSubmit = () => {
    event.preventDefault();
    dispatch({
      type: 'submitEndpoint',
      submitEndpoint: url,
    });
  };

  return (
    <div>
      <form onSubmit={() => handleSubmit()}>
        <textarea onChange={(e) => {
          setUrlInput(e.target.value);
          dispatch({
            type: 'addURL',
            addURL: urlInput,
          });
        }}
        />
        <input type="submit" value="Submit" />
      </form>
      <h3>
        {endpoint}
      </h3>
    </div>
  );
};


export default EndpointInput;
