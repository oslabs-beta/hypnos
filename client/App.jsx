import React from 'react';
import { StateProvider } from './Context';
import QueriesContainer from './Containers/QueriesContainer'
import Menu from './Components/Menu'
import gql from 'graphql-tag';


const App = () => {
  return (
    <div>
      <StateProvider>
        <QueriesContainer />
        <Menu />
      </StateProvider>
    </div>
  );
}

export default App;