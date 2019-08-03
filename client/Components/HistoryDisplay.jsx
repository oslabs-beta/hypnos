import React, { Component, useEffect } from 'react';
import db from '../db';
import { useStateValue } from '../Context';
import * as types from '../Constants/actionTypes';


const HistoryDisplay = () => {
  const [{ queriesHistory }, dispatch] = useStateValue();
  useEffect(() => {
    db.history
      .toArray()
      .then((queries) => {
        console.log('retrieved from DB', queries)
        dispatch({
          type: types.UPDATE_HISTORY,
          queriesHistory: queries
        });
      })
  }, [])

  const historyList = queriesHistory.map(el => {
    return <li id='el.id'>{el.query}</li>
  })

  return (
    <div>
      <ul id="history-display">
        {historyList}
      </ul>
    </div>
  )


};

export default HistoryDisplay;