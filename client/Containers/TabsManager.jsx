import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import QueriesContainer from './QueriesContainer';
import DeleteButton from '../Components/MiniComponents/TabsDeleteButton';
import HistoryDisplay from '../Components/HistoryDisplay';
import { useStateValue } from '../Context';
import defaultEndpoint from '../Constants/defaultEndpoint';

import { tabStyle, tabStyleMain, addButtonStyle } from '../Constants/inlineComponentStyle';

// import 'react-tabs/style/react-tabs.css';

const TabsManager = () => {
  // rendering tabs inside render method, based on tabsListLabels, just nums in an array
  const [{ endpointHistory }] = useStateValue();

  const [queriesTabs, setQueriesTabs] = useState({
    tabsListLabels: [0]
  });
  const [currentTab, setCurrentTab] = useState({ tabIndex: 0 });

  const deleteTab = tabId => {
    // delete tabs by checking tabId, which is passed as a prop upon creation of tab
    // let tabIdx;
    setQueriesTabs({
      tabsListLabels: queriesTabs.tabsListLabels.filter((el, idx) => el !== tabId)
    });
  };

  const addNewTab = () => {
    // push new item (just a num) to tabsListLabels
    const newTabsListLabels = queriesTabs.tabsListLabels.slice(0);

    // adds +1 to whateve the final item is in the list
    // console.log('getting obj keys, sorted desc', Object.keys(endpointHistory).sort((a, b) => b - a));
    const lastItemInHistory = Number(Object.keys(endpointHistory).sort((a, b) => b - a)[0]) + 1;
    const lastItemLocal = newTabsListLabels[newTabsListLabels.length - 1] + 1;
    const newLabel = lastItemLocal >= lastItemInHistory ? lastItemLocal : lastItemInHistory;
    // const newLabel = newTabsListLabels[newTabsListLabels.length - 1] + 1;
    newTabsListLabels.push(newLabel);
    // console.log('new tabs: ', newTabsListLabels);

    setQueriesTabs({
      tabsListLabels: newTabsListLabels
    });
  };

  //  NEW: history displayed rendered inside of tabs manager now. same location in DOM
  return (
    <>
      <HistoryDisplay currentTabID={Number(queriesTabs.tabsListLabels[currentTab.tabIndex])} />
      <>
        <Tabs
          forceRenderTabPanel
          selectedIndex={currentTab.tabIndex}
          onSelect={(tabIndex, lastIndex, event) => {
            // console.log('last tab: ', lastIndex);
            // console.log('new tab: ', tabIndex);
            // console.log('unique ids: ', queriesTabs);

            // tabIdToSave is the unique value given by dev. tabIndex is managed by tabs itself
            // not being used currently but might be needed in future
            // const tabIdToSave = queriesTabs.tabsListLabels[lastIndex];
            // console.log(tabIdToSave);
            setCurrentTab({ tabIndex });
          }}
        >
          <TabList id="tabs-list">
            {queriesTabs.tabsListLabels.map((el, idx) =>
              idx !== 0 ? (
                <Tab key={`tab-${el}`} tab-id={el} style={tabStyle}>
                  {endpointHistory[el] ? endpointHistory[el] : defaultEndpoint}
                  <DeleteButton
                    className="delete-button"
                    key={`del-btn-${el}`}
                    tabId={el}
                    deleteTab={deleteTab}
                  />
                </Tab>
              ) : (
                <Tab key={`tab-${el}`} tab-id={el} style={tabStyleMain}>
                  {endpointHistory[el]}
                  <DeleteButton
                    id="main-tab-delete"
                    className="delete-button"
                    key={`del-btn-${el}`}
                    tabId={el}
                    deleteTab={() => {}}
                    isHidden
                  />
                </Tab>
              )
            )}
            {/* {<button type="button" onClick={deleteTab}>x</button>} */}
            <button type="button" id="add-tab-button" style={addButtonStyle} onClick={addNewTab}>
              +
            </button>
          </TabList>
          {/* {queriesTabs.queriesContainers} */}
          {queriesTabs.tabsListLabels.map((el, idx) => (
            <TabPanel id="tab-panel" key={`tab-panel-${el}`} tab-panel-id={el}>
              <QueriesContainer stateTabReference={el} key={`qc-${el}`} />
            </TabPanel>
          ))}
        </Tabs>
      </>
    </>
  );
};

export default TabsManager;
