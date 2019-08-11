import React, { useState, useEffect } from 'react';
import db from '../db';
import { useStateValue } from '../Context';
import HistoryListItem from './MiniComponents/HistoryListItem';
import * as types from '../Constants/actionTypes';


const HistoryDisplay = () => {
  const [{ query, queryGQLError }, dispatch] = useStateValue();
  const [localQH, setLocalQH] = useState([]);

  useEffect(() => {
    db.history
      .toArray()
      .then((queries) => {
        // console.log('retrieved from DB', queries);
        setLocalQH(queries.reverse());
        // dispatch({
        //   type: types.UPDATE_HISTORY,
        //   queriesHistory: queries,
        // });
      })
      .catch(e => console.log('Error fetching from DB: ', e));
  }, [query, queryGQLError]);

  const onEdit = (id) => {
    event.preventDefault();
    db.history
      .get(id)
      .then((foundQuery) => {
        // console.log('Query in onEdit ', foundQuery);
        dispatch({
          type: types.GET_QUERY,
          historyTextValue: foundQuery.query,
          endpoint: foundQuery.endpoint,
        });
      })
      .then(() => {
        const inputFields = document.querySelectorAll('#endpoint-field input');
        console.log('input fields: ', inputFields);
        // clears fields for all input field attribues. but endpoint value at component level still takes in what was in endpoint field beforehand
        inputFields.forEach((el) => {
          el.value = '';
        });
        // inputFields.value = '';
      })
      .catch(e => console.log('Error searching DB.'));
  };

  const onDelete = (queryId) => {
    event.preventDefault();
    // console.log('running onDelete');
    db.history
      .delete(queryId)
      // .then(() => console.log('deleted ', queryId))
      .then(() => {
        setLocalQH(localQH.filter(queryItem => queryItem.id !== queryId));
      })
      .catch(e => console.log('Error deleting from DB :', e));
  };

  return (
    <section id="history-display">
      <p id="history-header">History</p>
      <ul id="history-list">
        {localQH.map((pastQueries, idx) => <HistoryListItem key={`history-li-${idx}`} query={pastQueries.query} id={pastQueries.id} onDelete={onDelete} onEdit={onEdit} />)}
      </ul>
    </section>
  );
};

export default HistoryDisplay;
