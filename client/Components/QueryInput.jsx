import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useStateValue } from '../Context';
import * as types from '../Constants/actionTypes';

const proxy = 'https://cors-anywhere.herokuapp.com/';


const QueryInput = () => {
  const [textValue, setTextValue] = useState('gql`\n#write query below\n\n`');
  // console.log('textValue ', textValue)
  const [{ query, url }, dispatch] = useStateValue();

  const handleSubmit = () => {
    event.preventDefault();
    console.log('submitted!: ', url);
    fetch(proxy + url, {
      // mode: 'no-cors',
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then((data) => {
        console.log('data from query: ', data);
        dispatch({
          type: types.RUN_QUERY,
          query: gql([`${textValue}`]),
          queryResultObject: textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim(),
        });
      })
      .catch((error) => {
        console.log('error in fetch ', error);
        console.log('textValue ', textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim());
        dispatch({
          type: types.ERROR_404,
          result404: 'Endpoint incorrect. Please doublecheck your endpoint.',
        });
      });
  };

  return (

    <article id="query-input">
      <form onSubmit={() => handleSubmit()}>
        <textarea value={textValue} onChange={e => setTextValue(e.target.value)} />
        <input type="submit" value="Submit" className="submit-button" />
      </form>
    </article>


  );
};

export default QueryInput;
