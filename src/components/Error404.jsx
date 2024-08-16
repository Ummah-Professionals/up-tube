import React from 'react';
import './Error404.css';
import GlobalHeader from '../pages/globalheader';

export const Error404 = () => {
  return (
    <>
    <GlobalHeader />
    <div className="error-container">
      <img src='../public/Error404.png' alt="404 Error" className="error-image" />
      <h1>Internal Server Error</h1>
      <p>Sorry, something went wrong.</p>
    </div>
    </>
  );
};

