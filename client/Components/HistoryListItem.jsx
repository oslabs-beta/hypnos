/* eslint-disable react/button-has-type */
import React from 'react';

const HistoryListItem = (props) => {
  const {
    id, query, onDelete, onEdit,
  } = props;
  console.log('rendering a list item');
  return (
    <>
      <li db-id={id} className="history-list-item" id={`hist-li-${id}`}>
        {query}
        <button
          id={`del-btn-${id}`}
          onClick={() => {
            console.log('del clicked');
            onDelete(id);
          }}
        >
          Delete
        </button>
        <button
          id={`edit-btn-${id}`}
          onClick={() => {
            console.log('edit clickd');
            onEdit(id);
          }}
        >
          Edit
        </button>
        <br />
        <br />
      </li>
    </>
  );
};

export default HistoryListItem;
