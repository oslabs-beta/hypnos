import React from 'react';
import { useStateValue } from '../Context';
import * as types from '../Constants/actionTypes';

const Menu = () => {
  // just uncomment when you want you start using Menu!
  const [{ }, dispatch] = useStateValue();

  // try making button type reset

  return (
    <section id="menu">
      <button
        id="reset-button"
        onClick={() => {
          dispatch({
            type: types.RESET_STATE,
          });
        }
      }
      >
        Reset
      </button>
    </section>
  );
};


export default Menu;
