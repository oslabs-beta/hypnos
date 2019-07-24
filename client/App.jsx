import React, { Component } from 'react';
import { StateProvider } from './Context';
import QueriesContainer from './Containers/QueriesContainer.jsx'

// class App extends Component {
//   render() {

//     return (
//       <div>
//         <h1>Hello World</h1>
//       </div >
//     )
//   }
// }

const App = () => {
  const initialState = {
    greeting: 'hello Sophie'
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'newGreeting':
        return {
          ...state,
          greeting: action.newGreeting
        };
      default:
        return state;
    }
  }

  return (
    <div>
      <StateProvider initialState={initialState} reducer={reducer}>
        <QueriesContainer />
      </StateProvider>
    </div>
  );
}


export default App;

