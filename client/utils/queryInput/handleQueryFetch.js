import gql from 'graphql-tag';
import fetchErrorCheck from './fetchErrorCheck';
import * as types from '../../Constants/actionTypes';

const proxy = Number(process.env.IS_DEV) === 1 ? 'https://cors-anywhere.herokuapp.com/' : '';

const handleQueryFetch = (textValue, urlToSend, dispatch, setNewAPIEndpoint) => {
  // prevent refresh
  event.preventDefault();

  console.log('Running handleQueryFetch');
  // const urlToSend = newAPIEndpoint || endpoint;

  // // send textValue to Dexie db
  // db.history.put({
  //   query: textValue,
  //   endpoint: urlToSend,
  // })
  //   .then(() => console.log('Sent to database.'))
  //   .catch(e => console.log('Error adding query to database.'));


  // ! NOTE: Nested test dispatch added to codeSnippets

  // make initial fetch to api, to ensure endpoint is valid. proxy to get around CORS

  // added w/ new promise format
  return new Promise((resolve, reject) => {
    // * NOTE, 8/6: THROWING ERRORS BEFORE CATCH SEEMS TO HAVE BETTER ERROR MESSAGING IN CONSOLE LOGS
    // * REJECTING IN CATCH SEEMS TO HAVE BETTER HANDLING

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
        // SHOULD ADD CHECKS FOR 400, 401, 403, maybe more
        // 422 => happened in one instance with an API key but no attached query
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
            // changed this dispatch message to match error thrown below
            gqlError: 'Path is invalid. Please double check your path.',
            // gqlError: '@rest must have a \'path\' and \'type\' property. Please click reset to check the example for reference.',
          });
          // throwing error/reject stops promise chain
          throw new Error('Path is invalid. Please double check your path.');
        } else {
          // if regex is NOT null, there was a path. fetch is now made to endpoint + path
          const path = textValue.match(/(?<=path:\W*\")\S*(?=\")/gi)[0].trim();
          // ! NEED: check if there's a param in the path
          // return fetch, which creates a promise
          return fetch(proxy + urlToSend + path, {
            headers: {
              'Access-Control-Allow-Origin': '*',
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
        resolve('Fetch chain successful.');
      })
      .catch((error) => {
        // moved error checking to other file for code clarity
        fetchErrorCheck(error, dispatch, reject);
        // added w/new promise format
      });
  });
};

export default handleQueryFetch;
