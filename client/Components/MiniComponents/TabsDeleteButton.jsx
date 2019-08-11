import React from 'react';

const DeleteButton = (props) => {
  const { tabId, deleteTab } = props;
  return (
    <button type="button" tab-id={tabId} onClick={() => deleteTab(tabId)} style={{}}><i className="fas fa-times fa-sm" /></button>
  );
};

export default DeleteButton;
