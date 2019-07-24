import React, { useState } from "react";
import { graphql } from "react-apollo";
import gql from 'graphql-tag';


const QueryInput = () => {

    const [textValue, setTextValue] = useState("const query = gql`\n#write query below\n\n`")
    console.log('textValue ', textValue)

    const handleSubmit = () => {
        event.preventDefault();
        console.log("submitted!");

    }

    return (

        <div>
            <form onSubmit={() => handleSubmit()}>
                <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)} />
                <input type="submit" value="Submit" />
            </form>
        </div>

    )

}

export default QueryInput