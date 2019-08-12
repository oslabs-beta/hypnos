import React from 'react';
import { useStateValue } from '../Context';
import APIModal from './APIKeyModal';

import defaultEndpoint from '../Constants/defaultEndpoint';

const EndpointField = (props) => {
  // streamlined to not use local state from queryInput component
  const { setNewAPIEndpoint, stateTabReference } = props;
  const [{ endpoint, endpointHistory, endpointFromDB }] = useStateValue();

  return (
    <article id="endpoint-field" input-field-tab-id={stateTabReference}>
      <input
        type="text"
        placeholder={`Current endpoint: ${endpointHistory[stateTabReference] || defaultEndpoint}`}
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
