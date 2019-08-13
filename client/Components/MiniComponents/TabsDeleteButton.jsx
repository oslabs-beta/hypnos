import React from 'react';

const DeleteButton = (props) => {
  const { tabId, deleteTab, isHidden } = props;
  return (
    <button type="button" tab-id={tabId} onClick={() => deleteTab(tabId)} style={{ borderStyle: 'none', paddingLeft: '5px', fontSize: '10px', backgroundColor: '#f7f9fb', visibility: isHidden ? 'hidden' : 'visible' }}>X</button>
  );
};

export default DeleteButton;
