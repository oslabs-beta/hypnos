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
      submitEndpoint: urlInput,
    });
  };

  return (
    <div>
      <form onSubmit={() => handleSubmit()}>
        <textarea onChange={(e) => {
          // console.log('new value from text area: ', e.target.value);
          // have to assign value from text area instead of local state, since state setter
          // and dispatch are async
          const newUrl = e.target.value;
          setUrlInput(newUrl);
          // console.log('url input inside onChange in EI: ', urlInput);
          dispatch({
            type: 'addURL',
            addURL: newUrl,
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
