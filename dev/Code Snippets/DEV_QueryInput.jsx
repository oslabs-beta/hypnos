{ /* NOTE: IN CASE THERE ARE RESET/IMMEDIATELY QUERY ISSUES, USE BUTTON OUTSIDE FORM */ }
{ /* <button
          type="submit"
          id="reset-button"
          onClick={() => {
            dispatch({
              type: types.RESET_STATE,
            });
            // after reseting state, reset endpoint field to empty string. in state, it will be SWAPI
            // moved button out of form

            // vanilla DOM manipulation was the best way to change the input field value
            const inputField = document.querySelector('#endpoint-field input');
            inputField.value = '';
            // reset textValue field to exampleQuery
            setTextValue(exampleQuery);
            // reset api endpoint to blank string
            setNewAPIEndpoint('');
          }}
        >
Reset
        </button> */ }
