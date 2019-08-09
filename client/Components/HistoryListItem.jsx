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
      <li db-id={id} className="history-list-item" id={`hist-li-${id}`}
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}>
        {query}
        {isHovering && (
          <span id='button-hover'>
            <button
              className='history-delete'
              id={`del-btn-${id}`}
              onClick={() => {
                // console.log('del clicked');
                onDelete(id);
              }}
            ><i class="fas fa-trash fa-lg"></i>
        </button>
            <button
              className='history-edit'
              id={`edit-btn-${id}`}
              onClick={() => {
                // console.log('edit clicked');
                onEdit(id);
              }}
            ><i class="fas fa-pen fa-lg"></i>
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
