import React from 'react';

const DeleteButton = (props) => {
  const { tabId, deleteTab } = props;
  return (
    <button type="button" tab-id={tabId} onClick={() => deleteTab(tabId)} style={{}}><i class="fas fa-times fa-sm"></i></button>
  );
};

export default DeleteButton;
