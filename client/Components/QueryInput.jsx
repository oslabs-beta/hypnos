import React, { useState } from "react";
import { graphql } from "react-apollo";
import gql from 'graphql-tag';
import { useStateValue } from '../Context';


const QueryInput = () => {

  const [textValue, setTextValue] = useState("const query = gql`\n#write query below\n\n`")
  // console.log('textValue ', textValue)
  const [{ query }, dispatch] = useStateValue();

  const handleSubmit = () => {
    event.preventDefault();

    console.log("submitted!");

    dispatch({
      type: 'addQuery',
      query: textValue,
    });

  }

  return (

    <div>
      <form onSubmit={() => handleSubmit()}>
        <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
      <div>
        Here's our new query string: {query}
      </div>
    </div>



  )

}

export default QueryInput