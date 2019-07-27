import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useStateValue } from '../Context';
import EndpointField from './EndpointField';
import * as types from '../Constants/actionTypes';

// import Code Mirror styling all at once
import '../StyleSheets/external/CodeMirror.css';


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
  const [{ query, url, endpoint }, dispatch] = useStateValue();
  // should be able to use endpoint
  const [newAPIEndpoint, setNewAPIEndpoint] = useState('');

  console.log('new api endpoint var: ', newAPIEndpoint);

  const handleSubmit = () => {
    const urlToSend = newAPIEndpoint || endpoint;
    event.preventDefault();
    console.log('submitted!: ', newAPIEndpoint);
    fetch(proxy + urlToSend, {
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
        console.log('new api endpoint before dispatch: ', urlToSend);
        dispatch({
          type: types.RUN_QUERY,
          query: gql([`${textValue}`]),
          queryResultObject: textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim(),
          newEndpoint: urlToSend,
        });
        setNewAPIEndpoint('');
      })
      .catch((error) => {
        // catches any non-404 erroes in the fetch process. moved dispatch away from here
        console.log('error in fetch ', error);
        console.log('textValue ', textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim());
      });
  };

  console.log('changing new api endpoint: ', newAPIEndpoint);

  return (
    <>
      <EndpointField setNewAPIEndpoint={setNewAPIEndpoint} />
      
      <article id="query-input">
        <form onSubmit={() => handleSubmit()}>
          <CodeMirror
            value={textValue}
            onBeforeChange={(editor, data, value) => setTextValue(value)}
            onChange={(editor, data, value) => { console.log('typing'); console.log('editor: ', editor); console.log('data: ', data); console.log('value: ', value); setTextValue(value); }}
            options={{
              lineNumbers: true,
              tabSize: 2,
              lineWrapping: true,
            }}
          />
          {/* <textarea value={textValue} placeholder={exampleQuery} onChange={(e) => { console.log('typing'); setTextValue(e.target.value); }} /> */}
          <input type="submit" value="Submit" className="submit-button" />
          <input
            value='Reset'
            id="reset-button"
            onClick={() => {
              dispatch({
                type: types.RESET_STATE,
              });
            }
            }
          />
        </form>   
      </article>
    </>


  );
};

export default QueryInput;
