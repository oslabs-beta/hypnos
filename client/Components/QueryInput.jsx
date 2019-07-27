import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useStateValue } from '../Context';
import * as types from '../Constants/actionTypes';
// using a proxy to get around CORS. WE PROBABLY NEED A SERVER NOW.
const proxy = 'https://cors-anywhere.herokuapp.com/';

// wrote example query so it can be used as a placeholder in textarea
const exampleQuery = `# Example query:
query luke {
  person @rest(type: "Person", path: "people/1/") {
    name
  }
}`;

const QueryInput = () => {
  const [textValue, setTextValue] = useState(exampleQuery);
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
      .then((response) => {
        if (response.status === 404) {
          // moved 404 check into first then, to actually check for status code
          dispatch({
            type: types.ERROR_404,
            result404: 'Endpoint is invalid. Please double check your endpoint.',
          });
          throw new Error('Endpoint is invalid. Please double check your endpoint.');
        } else return response.json();
      })
      .then((data) => {
        // if get request is successful, parse it here. fire dispatch to run query
        console.log('data from query: ', data);
        dispatch({
          type: types.RUN_QUERY,
          query: gql([`${textValue}`]),
          queryResultObject: textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim(),
        });
      })
      .catch((error) => {
        // catches any non-404 erroes in the fetch process. moved dispatch away from here
        console.log('error in fetch ', error);
        console.log('textValue ', textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim());
      });
  };

  return (

    <article id="query-input">
      <form onSubmit={() => handleSubmit()}>
        <textarea value={textValue} placeholder={exampleQuery} onChange={e => setTextValue(e.target.value)} />
        <input type="submit" value="Submit" className="submit-button" />
      </form>
    </article>


  );
};

export default QueryInput;
