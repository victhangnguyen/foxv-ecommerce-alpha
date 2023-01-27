import React from 'react';
import Typewriter from 'typewriter-effect';

const Jumbotron = ({ textArr }) => {
  return (
    <div className="jumbotron">
      <Typewriter
        options={{
          strings: textArr,
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default Jumbotron;
