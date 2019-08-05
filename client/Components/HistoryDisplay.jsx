import React, { useState, useEffect } from 'react';
import db from '../db';
import { useStateValue } from '../Context';
import * as types from '../Constants/actionTypes';


const HistoryDisplay = () => {
  const [{ queriesHistory, query, queryGQLError }, dispatch] = useStateValue();
  const [localQH, setLocalQH] = useState([]);

  const handleClick = (event) => {
    event.preventDefault();
    // delete div
    const element = document.getElementById(event.target.id).parentNode;
    console.log(element);
    // delete from DB by id
    const id = Number(element.getAttribute('db-id'));
    db.history
      .delete(id)
      .then(() => {
        console.log('deleted ', id);
        db.history
          .toArray()
          .then((queries) => {
            console.log('retrieved from DB', queries);
            element.parentNode.removeChild(element);

            setLocalQH(queries);
            // dispatch({
            //   type: types.UPDATE_HISTORY,
            //   queriesHistory: queries,
            // });
          })
          .catch(e => console.log('Error fetching from DB.'));
      })
      .catch(e => console.log('Error in deleting from database.'));
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
      })
      .catch(e => console.log('Error fetching from DB.'));
  }, [query, queryGQLError]);


  console.log('queriesHistory, before render: ', localQH);
  // const historyList = queriesHistory.map(el => <li id="el.id">{el.query}</li>);
  const historyList = localQH.map(el => (
    <li db-id={el.id} id={`qh-${el.id}`}>
      {el.query}
      <button id={`del-btn-${el.id}`} onClick={() => handleClick(event)}>delete</button>
      <button id={`edit-btn-${el.id}`}>edit</button>
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
