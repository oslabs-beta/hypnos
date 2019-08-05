import React, { useState, useEffect } from 'react';
import db from '../db';
import { useStateValue } from '../Context';
import * as types from '../Constants/actionTypes';


const handleClick = () => {
  event.preventDefault();
  console.log('handle click running');
  console.log('event target: ', event.target);
  console.log('button id: ', event.target.id);
  //delete div

  // now targets the specific LI
  let element = document.getElementById(event.target.id).parentElement;
  console.log('what is element', element.getAttribute('db-id'));
  if (element !== null) {
    // gets DB ID
    const id = Number(element.getAttribute('db-id'))
    // targets LI, its parent UL, then removes LI
    element.parentElement.removeChild(element);
    //delete from DB by id

    // LOCALQH STILL NOT UPDATING AFTER DOM MANIPULATION
    db.history
      .delete(id)
      .then(console.log('deleted ', id));
  }
}

// const updateQueries = () => {
//   db.history
//     .toArray()
//     .then((queries) => {
//       console.log('retrieved from DB', queries);
//       setLocalQH(queries);
//       // dispatch({
//       //   type: types.UPDATE_HISTORY,
//       //   queriesHistory: queries,
//       // });
//     });
// }

const HistoryDisplay = () => {
  const [{ query, queryGQLError }, dispatch] = useStateValue();
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


  // console.log('queriesHistory, before render: ', queriesHistory);
  // const historyList = queriesHistory.map(el => <li id="el.id">{el.query}</li>);
  const historyList = localQH.map(el => {
    return (
      <li db-id={el.id} id={`hist-li-${el.id}`}>{el.query}
        <button id={`del-btn-${el.id}`} onClick={handleClick}>delete</button>
        <button id={`edit-btn-${el.id}`}>edit</button>
      </li>
    )
  }
  );

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
