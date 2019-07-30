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
    // prevent refresh
    event.preventDefault();
    // console.log('submitted to: ', urlToSend);
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
        // if Gql query does not start with 'query'
        if (error.message.slice(0, 29) === 'Syntax Error: Unexpected Name') {
          dispatch({
            type: types.GQL_ERROR,
            result404: 'Query method is invalid. Please double check your query on line 1',
          });
          // this needs work. There are several errors that come through with the same error name and we'll have to figure out how best to parse them
        } else if (error.message.slice(0, 27) === 'Syntax Error: Expected Name') {
          dispatch({
            type: types.GQL_ERROR,
            result404: '@rest must have a \'path\' and \'type\' property. Please click reset to check the example for reference',
          });
          // if query does not have proper curly braces
        } else if (error.message === 'Syntax Error: Expected Name, found <EOF>' || error.message.slice(0, 24) === 'Syntax Error: Expected {' || error.message.slice(0, 26) === 'Syntax Error: Unexpected }') {
          dispatch({
            type: types.GQL_ERROR,
            result404: 'Query must be wrapped in curly braces.',
          });
          // if the variable before @rest does not exist
        } else if (error.message === 'Syntax Error: Expected Name, found @') {
          dispatch({
            type: types.GQL_ERROR,
            result404: 'Variable before @rest cannot be blank. Please click reset and check line 3 of the example for reference.',
          });
          // if the query fields are blank
        } else if (error.message === 'Syntax Error: Expected Name, found }') {
          dispatch({
            type: types.GQL_ERROR,
            result404: 'Query fields cannot be blank. Please click reset and check line 4 of the example for reference',
          });
        } else if (error.message.slice(0, 24) === 'Syntax Error: Expected :') {
          dispatch({
            type: types.GQL_ERROR,
            result404: 'Inside @rest, type must be followed by a colon, i.e. type:',
          });
        } else {
          console.log('Error in fetch: ', error);
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

      </article>
    </>


  );
};

export default QueryInput;
