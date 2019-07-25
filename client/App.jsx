import React from 'react';
import { StateProvider } from './Context';
import QueriesContainer from './Containers/QueriesContainer'
import Menu from './Components/Menu'
import "./StyleSheets/App.scss"


const App = () => {
  return (
    <div id="app">
      <StateProvider>
        <Menu />
        <QueriesContainer />
      </StateProvider>
    </div>
  );
}

export default App;