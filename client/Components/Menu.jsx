import React from 'react';
import { useStateValue } from '../Context';

const Menu = () => {
  // just uncomment when you want you start using Menu!
  const [{ greeting }, dispatch] = useStateValue();


  return (
    <div>
      <h2>inside menu</h2>
      <button onClick={() => {
        dispatch({
        type: 'resetState'
        })}
        }>
        Reset State
      </button>
    </div>
  )
}


export default Menu;