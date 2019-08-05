import React, { useState, useEffect } from 'react';
import db from '../db';
import { useStateValue } from '../Context';
import HistoryListItem from './HistoryListItem';
import * as types from '../Constants/actionTypes';


const HistoryDisplay = () => {
  const [{ query, queryGQLError }, dispatch] = useStateValue();
  const [localQH, setLocalQH] = useState([]);


  useEffect(() => {
    db.history
      .toArray()
      .then((queries) => {
        console.log('retrieved from DB', queries);
        setLocalQH(queries);
      });
  }, [query, queryGQLError]);

  const onEdit = (id) => {
    event.preventDefault();
    db.history
      .get(id)
      .then((foundQuery) => {
        console.log('query in onEdit ', foundQuery.query);
        dispatch({
          type: types.GET_QUERY,
          historyTextValue: foundQuery.query,
          endpoint: foundQuery.endpoint,
        });
      })
      .then(() => {
        const inputField = document.querySelector('#endpoint-field input');
        inputField.value = '';
      })
      .catch(e => console.log('Error searching DB.'));
  };

  const onDelete = (queryId) => {
    event.preventDefault();
    console.log('running onDelete');
    db.history
      .delete(queryId)
      .then(() => console.log('deleted ', queryId))
      .then(() => {
        setLocalQH(localQH.filter(queryItem => queryItem.id !== queryId));
      })
      .catch(e => console.log('error deleting from DB :', e));
  };

  return (
    <section id="history-display">
      <p id='history-header'>History</p>
      <ul id="history-list">
        {localQH.map(pastQueries => <HistoryListItem query={pastQueries.query} id={pastQueries.id} onDelete={onDelete} onEdit={onEdit} />)}
      </ul>
    </section>
  );
};

export default HistoryDisplay;
