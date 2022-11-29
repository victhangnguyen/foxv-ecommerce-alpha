import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoaderCommponent = () => {
  return (
    <div className="loader-container">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoaderCommponent;
