import React from 'react';
import { useStateValue } from '../Context';

const Menu = () => {
  // just uncomment when you want you start using Menu!
  const [{ }, dispatch] = useStateValue();


  return (
    <section id="menu">
      <button onClick={() => {
        dispatch({
          type: 'resetState'
        })}
      }
      >
        Reset State
      </button>
    </section>
  )
}


export default Menu;