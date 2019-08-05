import React, { useState, useEffect } from 'react';
import db from '../db';
import { useStateValue } from '../Context';
import * as types from '../Constants/actionTypes';


const handleClick = (event) => {
  event.preventDefault();
  // delete div
  const element = document.getElementById(event.target.id);
  element.parentNode.removeChild(element);
  // delete from DB by id
  const id = Number(event.target.id);
  db.history
    .delete(id)
    .then(console.log('deleted ', id));
};

const HistoryDisplay = () => {
  const [{ queriesHistory, query, queryGQLError }, dispatch] = useStateValue();
  const [localQH, setLocalQH] = useState([]);

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


  console.log('queriesHistory, before render: ', queriesHistory);
  // const historyList = queriesHistory.map(el => <li id="el.id">{el.query}</li>);
  const historyList = localQH.map(el => (
    <li id={el.id}>
      {el.query}
      <button id={el.id} onClick={() => handleClick(event)}>delete</button>
      <button id={el.id}>edit</button>
    </li>
  ));

  console.log('historyList => list of queries as LIs ', historyList);
  return (
    <div>
      <ul id="history-display">
        {historyList}
      </ul>
    </div>
  );
};

export default HistoryDisplay;
