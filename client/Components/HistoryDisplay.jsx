import React, { useState, useEffect } from 'react';
import db from '../db';
import { useStateValue } from '../Context';
import HistoryListItem from './HistoryListItem';

const HistoryDisplay = () => {
  const [{ query, queryGQLError }] = useStateValue();
  const [localQH, setLocalQH] = useState([]);

  useEffect(() => {
    // LOCALQH STILL NOT UPDATING AFTER DOM MANIPULATION
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
