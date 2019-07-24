import React, { useState } from "react";


const QueryInput = () => {

    const [textValue, setTextValue] = useState("const query = gql")
    console.log('textValue ', textValue)
    return (

        <div>
            <form>
                <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)} />
                <input type="submit" value="Submit" />
            </form>
        </div>

    )

}

export default QueryInput