import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useStateValue } from '../Context';
import EndpointField from './EndpointField';
import fetchErrorCheck from '../utils/fetchErrorCheck';
import * as types from '../Constants/actionTypes';

// import Code Mirror styling all at once
import '../StyleSheets/external/CodeMirror.css';


// using a proxy to get around CORS. WE PROBABLY NEED A SERVER NOW.
const proxy = 'https://cors-anywhere.herokuapp.com/';

// wrote example query so it can be used as a placeholder in textarea
const exampleQuery = `# Example query:
query ditto {
  pokemon @rest(type: "Pokemon", path: "ditto/") {
    name
    abilities
  }
}`;


const QueryInput = () => {
  const [textValue, setTextValue] = useState(exampleQuery);
  const [{ endpoint }, dispatch] = useStateValue();
  const [newAPIEndpoint, setNewAPIEndpoint] = useState('');

  // ! TO DELETE: TEST METHOD TO SEE IF FRONTEND CONNECTS TO SERVER
  const serverCheck = () => {
    event.preventDefault();

    // this goes directly to dev server
    // works with localhost:3030. need to have server SERVE up app
    fetch('http://localhost:3030/api')
      .then(response => response.json())
      .then((data) => {
        console.log('response: ', data.msg);
      })
      .catch(e => console.log('error in server test: ', e));
  };

  // this fetch chain/handleSubmit should be added into a different file
  // and imported. might be a heavy lift because of all the variables
  const handleSubmit = () => {
  // ! TO DELETE: TEST METHOD TO SEE IF FRONTEND CONNECTS TO SERVER
    event.preventDefault();

    serverCheck();
    return;
    // ! END OF SERVER TEST

    // if there's a value in api endpoint, replace endpoint.
    // if it's empty, use endpoint in context state
    const urlToSend = newAPIEndpoint || endpoint;
    // prevent refresh
    event.preventDefault();

    // ! NOTE: Nested test dispatch added to codeSnippets

    // make initial fetch to api, to ensure endpoint is valid. proxy to get around CORS
    fetch(proxy + urlToSend, {
      // mode: 'no-cors',
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // catch all for when textValue is null

        // execute regex filtering on the path param
        const pathRegex = textValue.match(/(?<=path:\W*\")\S*(?=\")/gi);
        // 404 check for the endpoint
        if (response.status === 404) {
          dispatch({
            // send off error message for endpoint 404
            type: types.GQL_ERROR,
            gqlError: 'Endpoint is invalid. Please double check your endpoint.',
          });
          // throwing error stops promise chain
          throw new Error('Endpoint is invalid. Please double check your endpoint.');
        } else if (pathRegex === null) {
          // if regex is null, then there's no path
          dispatch({
            // dispatch path error
            type: types.GQL_ERROR,
            gqlError: '@rest must have a \'path\' and \'type\' property. Please click reset to check the example for reference.',
          });
          // throwing error stops promise chain
          throw new Error('Path is invalid. Please double check your path.');
        } else {
          // if regex is NOT null, there was a path. fetch is now made to endpoint + path
          const path = textValue.match(/(?<=path:\W*\")\S*(?=\")/gi)[0].trim();
          // return fetch, which creates a promise
          return fetch(proxy + urlToSend + path, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
      })
      // for checking if the path is correct
      .then((response) => {
        if (response.status === 404) {
          dispatch({
            type: types.GQL_ERROR,
            gqlError: 'Path is invalid. Please double check your path.',
          });
          throw new Error('Path is invalid. Please double check your path.');
        } else return response.json();
      })
      .then((data) => {
        // if get request is successful, parse it here. fire dispatch to run query
        dispatch({
          type: types.RUN_QUERY,
          // decontructed using of gql tag to make query object. need to pass in a stringliteral.
          query: gql([`${textValue}`]),
          // pulls of key for where data will be in result obj
          queryResultObject: textValue.match(/(?<=\{\W)(.*?)(?=\@)/g)[0].trim(),
          newEndpoint: urlToSend,
        });
        // reset local api endpoint
        setNewAPIEndpoint('');
      })
      .catch((error) => {
        // moved error checking to other file for code clarity
        fetchErrorCheck(error, dispatch);
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
            // editor and data are code mirror args. needed to access value
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
            {/* reset state button */}
            <input
              readOnly
              value="Reset"
              id="reset-button"
              className="submit-button"
              onClick={() => {
                dispatch({
                  type: types.RESET_STATE,
                });
                // after reseting state, reset endpoint field to empty string. in state,
                // it will be POKEAPI

                // vanilla DOM manipulation was the best way to change the input field value
                const inputField = document.querySelector('#endpoint-field input');
                inputField.value = '';
                // reset textValue field to exampleQuery
                setTextValue(exampleQuery);
                // reset api endpoint in local state to blank string
                setNewAPIEndpoint('');
              }}
            />
            {/* submit query button */}
            <input id="submit-button" type="submit" value="Submit" className="submit-button" />
          </section>
        </form>
      </article>
    </>
  );
};

export default QueryInput;
