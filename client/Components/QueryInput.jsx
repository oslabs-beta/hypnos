import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useStateValue } from '../Context';
import EndpointField from './EndpointField';
import fetchErrorCheck from '../utils/fetchErrorCheck';
import * as types from '../Constants/actionTypes';
import db from '../db';

// import Code Mirror styling all at once
import '../StyleSheets/external/CodeMirror.css';

// using a proxy to get around CORS. We do not need a server.
const proxy = Number(process.env.IS_DEV) === 1 ? 'https://cors-anywhere.herokuapp.com/' : '';

// wrote example query so it can be used as a placeholder in textarea
const exampleQuery = `# Example query:
query ditto {
  pokemon @rest(type: "Pokemon", path: "ditto/") {
    name
    abilities
  }
}`;


const QueryInput = () => {
  const [{ endpoint, historyTextValue }, dispatch] = useStateValue();
  const [textValue, setTextValue] = useState(exampleQuery);
  // if edit button has been clicked, then historyTextValue exists in state. reassigned to fill out
  // code mirror text area
  if (historyTextValue !== '' && textValue !== historyTextValue) setTextValue(historyTextValue);
  const [newAPIEndpoint, setNewAPIEndpoint] = useState('');

  // this fetch chain/handleSubmit should be added into a different file
  // and imported. might be a heavy lift because of all the variables
  const handleSubmit = () => {
    // if there's a value in api endpoint, replace endpoint.
    // if it's empty, use endpoint in context state
    console.log('testing fetch, code written after DB addition');
    const urlToSend = newAPIEndpoint || endpoint;

    // send textValue to Dexie db
    db.history.put({
      query: textValue,
      endpoint: urlToSend,
    })
      .then(() => console.log('sent to db'));

    // prevent refresh
    event.preventDefault();

    // ! NOTE: Nested test dispatch added to codeSnippets

    // make initial fetch to api, to ensure endpoint is valid. proxy to get around CORS
    fetch(proxy + urlToSend, {
      // mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // catch all for when textValue is null
        console.log('in first then block for fetch');

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
        console.log('in second then block of fetch');
        if (response.status === 404) {
          dispatch({
            type: types.GQL_ERROR,
            gqlError: 'Path is invalid. Please double check your path.',
          });
          throw new Error('Path is invalid. Please double check your path.');
        } else return response.json();
      })
      .then((data) => {
        console.log('in third then of fetch, before run query dispatch');
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
