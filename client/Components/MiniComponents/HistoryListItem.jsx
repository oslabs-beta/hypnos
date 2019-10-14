/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const HistoryListItem = props => {
  const [isHovering, toggleHover] = useState(false);
  const { id, queryText, endpoint, onDelete, onEdit } = props;

  const pathRegex = queryText.match(/(?<=path:\W*\")\S*(?=\")/gi);
  const path = pathRegex ? pathRegex[0] : 'invalid';
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
        <p>
          <span>Endpoint:</span> {endpoint}
        </p>
        <p>
          <span>Path:</span> {path}
        </p>
        {isHovering && (
          <span id="button-hover">
            <button
              className="history-delete"
              id={`del-btn-${id}`}
              onClick={() => {
                // console.log('del clicked');
                onDelete(id);
              }}
            >
              <FontAwesomeIcon icon={faTrash} size="lg" />
              {/* <i className="fas fa-trash fa-lg" /> */}
            </button>
            <button
              className="history-edit"
              id={`edit-btn-${id}`}
              onClick={() => {
                // console.log('edit clicked');
                onEdit(id);
              }}
            >
              <FontAwesomeIcon icon={faPen} size="lg" />
              {/* <i className="fas fa-pen fa-lg" /> */}
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
