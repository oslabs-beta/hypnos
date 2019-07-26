import React from 'react';
import { useStateValue } from '../Context';

const Menu = () => {
  // just uncomment when you want you start using Menu!
  const [{ }, dispatch] = useStateValue();


  return (
    <div>
      <button onClick={() => {
        dispatch({
          type: 'resetState'
        })}
      }
      >
        Reset State
      </button>
    </div>
  )
}


export default Menu;