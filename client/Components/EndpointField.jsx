import React, { useState } from 'react';
import { useStateValue } from '../Context';
import * as types from '../Constants/actionTypes';

const EndpointField = (props) => {
  const [{ endpoint, url }, dispatch] = useStateValue();
  console.log('what is endpoint: ', endpoint);
  // can be streamlined to not use local state, and maybe
  // one less value from context
  const [urlInput, setUrlInput] = useState(endpoint);

  const { setNewAPIEndpoint } = props;

  const handleSubmit = () => {
    event.preventDefault();
    dispatch({
      type: types.SUBMIT_ENDPOINT,
      submitEndpoint: urlInput,
    });
  };

  // do not need handle submit method on form anymore
  return (
    <article id="endpoint-field">
      <form onSubmit={() => handleSubmit()}>
        <input
          type="text"
          placeholder={`Current endpoint: ${endpoint}`}
          onChange={(e) => {
            // console.log('new value from text area: ', e.target.value);
            // have to assign value from text area instead of local state, since state setter
            // and dispatch are async

            // changing this state refreshes the query output display component
            // this component should be somewhere else or the state should be passed down/stored elsewhere
            const newUrl = e.target.value;
            setNewAPIEndpoint(newUrl);
            // setUrlInput(newUrl);
            // console.log('url input inside onChange in EI: ', urlInput);
            // dispatch({
            //   type: types.ADD_URL,
            //   addURL: newUrl,
            // });
          }}
        />
      </form>
    </article>
  );
};


export default EndpointField;
