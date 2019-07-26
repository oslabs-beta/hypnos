import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useStateValue } from '../Context';


const QueryInput = () => {
  const [textValue, setTextValue] = useState('gql`\n#write query below\n\n`');
  // console.log('textValue ', textValue)
  const [{ query, url }, dispatch] = useStateValue();

  const handleSubmit = () => {
    event.preventDefault();
    console.log('submitted!');
    console.log('url in handle submit ', url)
    fetch(url)
      .then(data => data.json())
      .then(data => {
        dispatch({
          type: 'runQuery',
          query: gql([`${textValue}`]),
          queryResultObject: textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim(),
        })
      })
      .catch((error) => {
        console.log('error in fetch ', error);
        console.log('textValue ', textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim())
        dispatch({
          type: '404Error',
          result404: 'Endpoint incorrect. Please doublecheck your endpoint.'
        })
      });
  };

  return (

    <div id="query-input">
      <form onSubmit={() => handleSubmit()}>
        <textarea value={textValue} onChange={e => setTextValue(e.target.value)} />
        <input type="submit" value="Submit" className="submit-button" />
      </form>
    </div>


  );
};

export default QueryInput;
