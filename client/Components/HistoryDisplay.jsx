import React, { useState, useEffect } from 'react';
import db from '../db';
import { useStateValue } from '../Context';
import HistoryListItem from './MiniComponents/HistoryListItem';
import * as types from '../Constants/actionTypes';

const HistoryDisplay = props => {
  const { currentTabID } = props;

  // edited query to have nested prop also called query. added query tab reference
  const [
    {
      query: { query },
      queryGQLError
    },
    dispatch
  ] = useStateValue();
  const [localQH, setLocalQH] = useState([]);

  useEffect(() => {
    db.history
      .toArray()
      .then(queries => {
        // console.log('retrieved from DB', queries);
        // displaying queries history in descending chronological order
        setLocalQH(queries.reverse());
      })
      .catch(e => console.log('Error fetching from DB: ', e));
  }, [query, queryGQLError]);

  const clearHistory = () => {
    db.history
      .clear()
      .then(() => {
        // console.log('Database cleared.');
        setLocalQH([]);
      })
      .catch(e => {
        throw new Error('Error in clearing database: ', e);
      });
  };

  const onEdit = id => {
    event.preventDefault();
    db.history
      .get(id)
      .then(foundQuery => {
        // console.log('Query in onEdit ', foundQuery);
        dispatch({
          type: types.EDIT_QUERY_FROM_DB,
          historyTextValue: foundQuery.query,
          endpoint: foundQuery.endpoint,
          currentTabID
        });
        return foundQuery;
      })
      .then(foundQuery => {
        const inputField = document.querySelector(
          `#endpoint-field[input-field-tab-id ="${currentTabID}"] input`
        );
        inputField.value = foundQuery.endpoint;
      })
      .catch(e => console.log('Error searching DB.'));
  };

  const onDelete = queryId => {
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
      <section id="history-header">History</section>
      <section id="clear-history">
        <button id="clear-history-button" type="button" onClick={clearHistory}>
          Clear History
        </button>
      </section>
      <ul id="history-list">
        {localQH.map((pastQueries, idx) => (
          <HistoryListItem
            key={`history-li-${idx}`}
            queryText={pastQueries.query}
            id={pastQueries.id}
            endpoint={pastQueries.endpoint}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </section>
  );
};

export default HistoryDisplay;
