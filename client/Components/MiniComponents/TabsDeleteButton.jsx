import React from 'react';
import { tabsDeleteButtonStyle as styleObj } from '../../Constants/inlineComponentStyle';

const DeleteButton = (props) => {
  const { tabId, deleteTab, isHidden } = props;
  styleObj.visibility = isHidden ? 'hidden' : 'visible';
  return (
    <button
      type="button"
      tab-id={tabId}
      onClick={() => deleteTab(tabId)}
      style={styleObj}
    >
      X
    </button>
  );
};

export default DeleteButton;
