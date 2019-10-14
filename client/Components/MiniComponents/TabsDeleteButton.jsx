import React from 'react';
import {
  tabsDeleteButtonStyle,
  tabsDeleteButtonMainStyle
} from '../../Constants/inlineComponentStyle';

const DeleteButton = props => {
  const { tabId, deleteTab, isHidden } = props;

  return (
    <button
      type="button"
      tab-id={tabId}
      onClick={() => deleteTab(tabId)}
      style={isHidden ? tabsDeleteButtonMainStyle : tabsDeleteButtonStyle}
    >
      X
    </button>
  );
};

export default DeleteButton;
