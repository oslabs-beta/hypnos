import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useStateValue } from '../Context';
import EndpointField from './EndpointField';
// import db from '../db';
import * as types from '../Constants/actionTypes';

// import Code Mirror styling all at once
import '../StyleSheets/external/CodeMirror.css';
import addQueryToDB from '../utils/queryInput/addQueryToDB';
import handleQueryFetch from '../utils/queryInput/handleQueryFetch';

// SHOULD MAKE NOTE: API key should be supplied in endpoint field
// using a proxy to get around CORS. We do not need a server.

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
  if (historyTextValue !== '' && textValue !== historyTextValue) {
    // if a user has asked for an old query, repopulate
    setTextValue(historyTextValue);
    // once history is assigned down here, reset it in context
    dispatch({
      type: types.RESET_GET_QUERY,
    });
  }
  const [newAPIEndpoint, setNewAPIEndpoint] = useState('');

  const handleSubmit = () => {
    event.preventDefault();
    const urlToSend = newAPIEndpoint || endpoint;

    // tries to run DB query and fetch chain in tandem
    // ! PROMISE.ALL TEST
    // * THIS SEEMS TO WORK FINE, 8/6
    Promise.all([addQueryToDB(textValue, urlToSend), handleQueryFetch(textValue, urlToSend, dispatch, setNewAPIEndpoint)])
      .then(() => console.log('DB query and fetches successful.'))
      .catch(e => console.log('Error in fetch/DB promise.all: ', e));
    // ! END OF PROMISE.ALL TEST

    // send textValue to Dexie db
    // runs DB query and THEN fetch chain
    // db.history.put({
    //   query: textValue,
    //   endpoint: urlToSend,
    // })
    //   .then(() => {
    //     console.log('Sent to database.');
    //     handleQueryFetch(textValue, urlToSend, dispatch, setNewAPIEndpoint);
    //   })
    //   .catch(e => console.log('Error adding query to database.'));
  };

  // this fetch chain/handleSubmit is in a different file,
  // as handleQueryFetch, and imported.

  return (
    <>
      <EndpointField setNewAPIEndpoint={setNewAPIEndpoint} />
      <article id="query-input">
        <form id="query-input-form" onSubmit={() => handleSubmit()}>
          <CodeMirror
            id="code-mirror"
            value={textValue}
            // editor and data are code mirror args. needed to access value
            onBeforeChange={(editor, data, value) => {
              setTextValue(value);
            }}
            onChange={(editor, data, value) => {
              setTextValue(value);
            }}
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
