import React, { useState } from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import QueriesContainer from './QueriesContainer';
import DeleteButton from '../Components/MiniComponents/TabsDeleteButton';

import 'react-tabs/style/react-tabs.css';

const TabsManager = () => {
  // rendering tabs inside render method, based on tabsListLabels, just nums in an array

  const [queriesTabs, setQueriesTabs] = useState({
    tabsListLabels: [0],
  });
  const [currentTab, setCurrentTab] = useState({ tabIndex: 0 });

  const deleteTab = (tabId) => {
    // delete tabs by checking tabId, which is passed as a prop upon creation of tab
    // let tabIdx;
    setQueriesTabs({
      tabsListLabels: queriesTabs.tabsListLabels.filter((el, idx) => el !== tabId),
      // if (el === tabId) tabIdx = idx;
    });

    // change tab if current tab was deleted tab not working
    // if (currentTab.tabIndex === tabIdx) setCurrentTab({ tabIndex: tabIdx - 2 });
  };

  const addNewTab = () => {
    // push new item (just a num) to tabsListLabels
    const newTabsListLabels = queriesTabs.tabsListLabels;

    newTabsListLabels.push(newTabsListLabels.length);

    setQueriesTabs({
      tabsListLabels: newTabsListLabels,
    });
  };
  return (
    <Tabs selectedIndex={currentTab.tabIndex} onSelect={tabIndex => setCurrentTab({ tabIndex })}>
      <TabList id="tabs-list">
        {queriesTabs.tabsListLabels.map((el, idx) => (idx !== 0
          ? (
            <Tab key={`tab-${el}`} tab-id={el}>
              {`Title ${el}`}
              <DeleteButton key={`del-btn-${el}`} tabId={el} deleteTab={deleteTab} />
            </Tab>
          )
          : (
            <Tab key={`tab-${el}`} tab-id={el}>
              {`Title ${el}`}
            </Tab>
          )))}
        {/* {<button type="button" onClick={deleteTab}>x</button>} */}
        <button type="button" id="add-tab-button" style={{ fontSize: '25px' }} onClick={addNewTab}>+</button>
      </TabList>
      {/* {queriesTabs.queriesContainers} */}
      {queriesTabs.tabsListLabels.map((el, idx) => <TabPanel id="tab-panel" key={`tab-panel-${el}`} tab-panel-id={el}><QueriesContainer key={`qc-${el}`} /></TabPanel>)}
    </Tabs>
  );
};

export default TabsManager;
