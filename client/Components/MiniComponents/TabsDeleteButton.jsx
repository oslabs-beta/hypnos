import React from 'react';

const DeleteButton = (props) => {
  const { tabId, deleteTab } = props;
  return (
    <button type="button" tab-id={tabId} onClick={() => deleteTab(tabId)}>X</button>
  );
};

export default DeleteButton;
