import React from 'react';

const DeleteButton = (props) => {
  const { tabId, deleteTab } = props;
  return (
    <button type="button" tab-id={tabId} onClick={() => deleteTab(tabId)} style={{ borderStyle: 'none', paddingLeft: '5px', fontSize: '13px' }}>X</button>
  );
};

export default DeleteButton;
