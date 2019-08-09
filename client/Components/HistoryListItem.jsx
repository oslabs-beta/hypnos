/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

const HistoryListItem = (props) => {
  const [isHovering, toggleHover] = useState(false);
  const {
    id, query, onDelete, onEdit,
  } = props;
  // console.log('rendering a list item');
  return (
    <>
      <li
        db-id={id}
        className="history-list-item"
        id={`hist-li-${id}`}
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
      >
        {query}
        {true && (
          <span id="button-hover">
            <button
              className="history-delete"
              id={`del-btn-${id}`}
              onClick={() => {
                console.log('del clicked');
                onDelete(id);
              }}
            >
              <i className="fas fa-trash fa-lg" />
            </button>
            <button
              className="history-edit"
              id={`edit-btn-${id}`}
              onClick={() => {
                console.log('edit clicked');
                onEdit(id);
              }}
            >
              <i className="fas fa-pen fa-lg" />
            </button>
          </span>
        )}
        <br />
        <br />
      </li>
    </>
  );
};

export default HistoryListItem;
