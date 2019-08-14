import React from 'react';

const ErrorDisplay = (props) => {
  const { errorMessage, extraSpace } = props;
  return (
    <>
      <p className="error">{errorMessage}</p>
      {extraSpace && (
        <>
          <br />
          {' '}
          <br />
        </>
      )}
    </>
  );
};

export default ErrorDisplay;
