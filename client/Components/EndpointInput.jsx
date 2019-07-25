import React, { useState } from 'react';
import { useStateValue } from '../Context';
import { withApollo } from 'react-apollo';
import { RestLink } from 'apollo-link-rest';

const EndpointInput = ({ client }) => {
  // just uncomment when you want you start using Menu!
  const [{ endpoint, greeting, url }, dispatch] = useStateValue();

  const handleSubmit = () => {
    event.preventDefault();
    dispatch({
      type: 'submitEndpoint',
      submitEndpoint: url
    })
    // seems like it's safe to have another function call after dispatch, since it only ends the execution context upon error
    client.link = new RestLink ({
      uri: url
    })
    console.log(client, 'this is client')
  }

  return (
    <div>
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


export default withApollo(EndpointInput);