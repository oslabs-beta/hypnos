import React, { useState, useEffect } from 'react';
import db from '../db';
import { useStateValue } from '../Context';
import HistoryListItem from './HistoryListItem';
import * as types from '../Constants/actionTypes';


const HistoryDisplay = () => {
  const [{ query, queryGQLError }, dispatch] = useStateValue();
  const [localQH, setLocalQH] = useState([]);

  const handleClickEdit = (event) => {
    event.preventDefault();
    const id = Number(event.target.id);
    db.history
      .get(id)
      .then((foundQuery) => {
        console.log('query in handleClickEdit ', foundQuery.query);
        dispatch({
          type: types.GET_QUERY,
          historyTextValue: foundQuery.query,
          endpoint: foundQuery.endpoint,
        });
      })
      .then(() => {
        const inputField = document.querySelector('#endpoint-field input');
        inputField.value = '';
      });
  };

  useEffect(() => {
    db.history
      .toArray()
      .then((queries) => {
        console.log('retrieved from DB', queries);
        setLocalQH(queries);
        // dispatch({
        //   type: types.UPDATE_HISTORY,
        //   queriesHistory: queries,
        // });
      });
  }, [query, queryGQLError]);

  const onDelete = (queryId) => {
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
      <ul id="history-list">
        {localQH.map(pastQueries => <HistoryListItem query={pastQueries.query} id={pastQueries.id} onDelete={onDelete} />)}
      </ul>
    </section>
  );
};

export default HistoryDisplay;
