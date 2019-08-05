/* eslint-disable react/button-has-type */
import React from 'react';

const HistoryListItem = (props) => {
  const { id, query, onDelete } = props;
  console.log('rendering a list item');
  return (
    <>
      <li db-id={id} id={`hist-li-${id}`}>
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
          onClick={() => console.log('edit clickd')}
        >
          Edit
        </button>
      </li>
    </>
  );
};

export default HistoryListItem;
