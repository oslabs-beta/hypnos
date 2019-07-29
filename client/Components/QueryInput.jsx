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
  const [{ endpoint }, dispatch] = useStateValue();
  const [newAPIEndpoint, setNewAPIEndpoint] = useState('');

  const handleSubmit = () => {
    // if there's a value in api endpoint, replace endpoint. if it's empty, use endpoint in context
    const urlToSend = newAPIEndpoint || endpoint;
    event.preventDefault();
    console.log('submitted to: ', urlToSend);
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
            type: types.GQL_ERROR,
            result404: 'Endpoint is invalid. Please double check your endpoint.',
          });
          throw new Error('Endpoint is invalid. Please double check your endpoint.');
        } else return response.json();
      })
      .then((data) => {
        // if get request is successful, parse it here. fire dispatch to run query
        dispatch({
          type: types.RUN_QUERY,
          query: gql([`${textValue}`]),
          queryResultObject: textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim(),
          newEndpoint: urlToSend,
        });
        setNewAPIEndpoint('');
      })
      .catch((error) => {
        // catches any non-404 errors in the fetch process. moved dispatch away from here
        if (error.message.slice(0, 29) === 'Syntax Error: Unexpected Name') {
          dispatch({
            type: types.GQL_ERROR,
            result404: 'Query method is invalid. Please double check your query',
          });
        } else if (error.message.slice(0, 27) === 'Syntax Error: Expected Name') {
          dispatch({
            type: types.GQL_ERROR,
            result404: 'Query path is invalid. Please double check your query path',
          });
        } else {
          console.log('error in fetch ', error);
        }
      });
  };

  return (
    <>
      <EndpointField setNewAPIEndpoint={setNewAPIEndpoint} />
      <article id="query-input">
        <form id="query-input-form" onSubmit={() => handleSubmit()}>
          <CodeMirror
            id="code-mirror"
            value={textValue}
            onBeforeChange={(editor, data, value) => setTextValue(value)}
            onChange={(editor, data, value) => setTextValue(value)}
            options={{
              lineNumbers: true,
              tabSize: 2,
              lineWrapping: true,
            }}
          />
          <section id="buttons">
            {/* NOTE: THIS IS PRESENTLY OK INSIDE THE FORM */}
            <input
              readOnly
              value="Reset"
              id="reset-button"
              className="submit-button"
              onClick={() => {
                dispatch({
                  type: types.RESET_STATE,
                });
                // after reseting state, reset endpoint field to empty string. in state, it will be SWAPI
                // moved button out of form

                // vanilla DOM manipulation was the best way to change the input field value
                const inputField = document.querySelector('#endpoint-field input');
                inputField.value = '';
                // reset textValue field to exampleQuery
                setTextValue(exampleQuery);
                // reset api endpoint to blank string
                setNewAPIEndpoint('');
              }}
            />
            <input id="submit-button" type="submit" value="Submit" className="submit-button" />
          </section>

        </form>

        {/* NOTE: IN CASE THERE ARE RESET/IMMEDIATELY QUERY ISSUES, USE BUTTON OUTSIDE FORM */}
        {/* <button
          type="submit"
          id="reset-button"
          onClick={() => {
            dispatch({
              type: types.RESET_STATE,
            });
            // after reseting state, reset endpoint field to empty string. in state, it will be SWAPI
            // moved button out of form

            // vanilla DOM manipulation was the best way to change the input field value
            const inputField = document.querySelector('#endpoint-field input');
            inputField.value = '';
            // reset textValue field to exampleQuery
            setTextValue(exampleQuery);
            // reset api endpoint to blank string
            setNewAPIEndpoint('');
          }}
        >
Reset
        </button> */}

      </article>
    </>


  );
};

export default QueryInput;
