import React from 'react';
import { useStateValue } from '../Context';
import EndpointInput from '../Components/EndpointInput';
import QueryOutput from '../Components/QueryOutput';
import RunQueryButton from '../Components/RunQueryButton';


const QueriesContainer = () => {
  const [{ greeting }, dispatch] = useStateValue();

  return (
    <div>
      {/* <h1>
        {greeting}
      </h1>
      <button
        onClick={() => dispatch({
          type: 'newGreeting',
          newGreeting: 'hello Dillon'
        })}
      >
        Change the Greeting!
      </button> */}
    <EndpointInput />
    <QueryOutput />
    <RunQueryButton />
    </div>
  );
}

export default QueriesContainer;