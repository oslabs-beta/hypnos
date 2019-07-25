import React, { useState } from 'react';
import { graphql } from 'react-apollo';
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
      type: 'addQuery',
      query: gql([`${textValue}`]),
      queryVar: textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim(),
    });
  };

  return (

    <div id="query-input">
      <form onSubmit={() => handleSubmit()}>
        <textarea value={textValue} onChange={e => setTextValue(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {// THIS IS WHAT WAS BREAKING. SHOWING AN OBJECT}
          `Here's our new query string: ${JSON.stringify(query)}`}
      </div>
    </div>


  );
};

export default QueryInput;
