import React from 'react';
import { useStateValue } from '../Context';
import APIModal from './APIKeyModal';

const EndpointField = (props) => {
  const [{ endpoint }] = useStateValue();
  // streamlined to not use local state from queryInput component
  const { setNewAPIEndpoint, stateTabReference } = props;

  return (
    <article id="endpoint-field" input-field-tab-id={stateTabReference}>
      <input
        type="text"
        placeholder={`Current endpoint: ${endpoint}`}
        onChange={(e) => {
          // have to assign value from text area instead of local state, since state setter
          // and dispatch are async
          console.log('chang in endpoint input');

          const newUrl = e.target.value;
          setNewAPIEndpoint(newUrl);
        }}
      />
      <APIModal />
    </article>
  );
};


export default EndpointField;
