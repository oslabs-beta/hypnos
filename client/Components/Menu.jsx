import React from 'react';
import { useStateValue } from '../Context';
import * as types from '../Constants/actionTypes';

const Menu = () => {
  // just uncomment when you want you start using Menu!
  const [{ }, dispatch] = useStateValue();


  return (
    <section id="menu">
      <button onClick={() => {
        dispatch({
          type: types.RESET_STATE,
        });
      }
      }
      >
        Reset State
      </button>
    </section>
  );
};


export default Menu;
