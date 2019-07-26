import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useStateValue } from '../Context';


const QueryInput = () => {
  const [textValue, setTextValue] = useState('gql`\n#write query below\n\n`');
  // console.log('textValue ', textValue)
  const [{ query }, dispatch] = useStateValue();

  const handleSubmit = () => {
    event.preventDefault();
    console.log('submitted!');
    dispatch({
      type: 'runQuery',
      query: gql([`${textValue}`]),
      queryResultObject: textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim(),
    });
  };

  return (

    <div>
      <form onSubmit={() => handleSubmit()}>
        <textarea value={textValue} onChange={e => setTextValue(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
      {/* <div>
        // THIS IS WHAT WAS BREAKING. SHOWING AN OBJECT}
          `Here's our new query string: ${JSON.stringify(query)}`
      </div> */}
    </div>


  );
};

export default QueryInput;
