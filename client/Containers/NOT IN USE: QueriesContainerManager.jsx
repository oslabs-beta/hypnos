import React, { useState } from 'react';
import QueriesContainer from './QueriesContainer';


const QueriesContainerManager = () => {
  const [QCwindows, setQCWindows] = useState([<QueriesContainer key="qc-window-0" />]);
  // const QCwindows = [<QueriesContainer key="qc-window-0" />];
  const addNewWindow = () => {
    console.log('adding new search window');
    const newQCWindows = QCwindows.slice(0);
    newQCWindows.push(<QueriesContainer key={`qc-window-${QCwindows.length}`} />);
    setQCWindows(newQCWindows);
    // QCwindows.push(<QueriesContainer key={`qc-window-${QCwindows.length}`} />);
    // console.log('new array length: ', QCwindows.length);
    // console.log('QC windows: ', QCwindows);
  };
  console.log('inside QCM');
  return (
    <section id="queries-container-manager">
      <button type="button" onClick={addNewWindow}>Add New Tab</button>
      {QCwindows}
    </section>
  );
};

export default QueriesContainerManager;
