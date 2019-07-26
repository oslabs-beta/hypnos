import React, { useState } from 'react';
import { useStateValue } from '../Context';

const EndpointField = () => {
  const [{ endpoint, url }, dispatch] = useStateValue();
  // can be streamlined to not use local state, and maybe
  // one less value from context
  const [urlInput, setUrlInput] = useState('');

  const handleSubmit = () => {
    event.preventDefault();
    dispatch({
      type: 'submitEndpoint',
      submitEndpoint: urlInput,
    });
  };

  return (
    <div>
      <form onSubmit={() => handleSubmit()}>
        <textarea onChange={(e) => {
          setUrlInput(e.target.value);
          console.log('url input: ', urlInput);
          dispatch({
            type: 'addURL',
            addURL: urlInput,
          });
        }}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};


export default EndpointField;
