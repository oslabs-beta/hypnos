export const tabsDeleteButtonStyle = {
  borderStyle: 'none',
  paddingLeft: '5px',
  fontSize: '10px',
  backgroundColor: '#f7f9fb',
  // isHidden must be handled at component level
  visibility: 'visible'
};

export const tabsDeleteButtonMainStyle = {
  ...tabsDeleteButtonStyle,
  visibility: 'hidden'
};

export const apiKeyModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#31708b',
    // width: '100px',
    borderRadius: '5px'
  }
};

export const tabStyle = {
  fontFamily: 'Helvetica, sans-serif',
  fontSize: '12px',
  backgroundColor: '#f7f9fb'
};

export const tabStyleMain = {
  ...tabStyle
  // height: '13px',
  // marginBottom used to be needed. now it's not
  // marginBottom: '1px',
};

export const addButtonStyle = {
  fontSize: '25px',
  borderStyle: 'none',
  paddingLeft: '5px',
  paddingBottom: '-6px',
  backgroundColor: '#f7f9fb',
  outline: 'none',
  alignSelf: 'center'
};
