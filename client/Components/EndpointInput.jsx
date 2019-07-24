import React, { useState } from 'react';
import { useStateValue } from '../Context';

const EndpointInput = () => {
  // just uncomment when you want you start using Menu!
  const [{ endpoint, greeting }, dispatch] = useStateValue();
  const [textValue, setTextValue] = useState();

  const handleSubmit = () => {
    event.preventDefault();
    console.log(textValue, 'this is textValue')
    dispatch({
      type: 'addEndpoint',
      addEndpoint: textValue
    })
  }


  return (
    <div>
      {/* <form>
        <input type='text' />
        <input type='submit' value='submit' 
          onSubmit={() => dispatch({
            type: 'addEndpoint',
            addEndpoint: event.target.value
        })}/>
      </form> */}
      <form onSubmit={() => handleSubmit()}>
        <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
      <h3>
        {endpoint}
      </h3>
    </div>
  )
}


export default EndpointInput;