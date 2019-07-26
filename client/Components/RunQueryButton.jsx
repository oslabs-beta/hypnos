// ****************

// this entire component can be deleted

// ****************

import React from 'react';
import { useStateValue } from '../Context';

const RunQueryButton = () => {
  // just uncomment when you want you start using Menu!
  const [{ }, dispatch] = useStateValue();


  return (
    <div>
      <h2>inside RunQueryButton</h2>
    </div>
  );
};

export default RunQueryButton;
