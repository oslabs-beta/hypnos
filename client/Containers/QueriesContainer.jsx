import React from 'react';
import { useStateValue } from '../Context';

const QueriesContainer = () => {
  const [{ greeting }, dispatch] = useStateValue();


  // console.log(greeting, 'this is greeting')
  // console.log(dispatch, 'this is dispatch')

  return (
    <div>
      <h1>
        {greeting}
      </h1>
      <button
        onClick={() => dispatch({
          type: 'newGreeting',
          newGreeting: 'hello Dillon'
        })}
      >
        Change the Greeting!
    </button>
    </div>
  );
}

export default QueriesContainer;