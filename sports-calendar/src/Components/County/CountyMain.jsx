import React, { useState } from 'react';
import CountyGet from './CountyGet';
import CountyById from './CountyGetById';
import CountyPost from './CountyPost';
import CountyPut from './CountyPut';
import CountyDelete from './CountyDelete';

function CountyDisplay() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleVisibility = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div>
    <button onClick={toggleVisibility}>
      {isOpen ? 'Close County CRUD' : 'Open County CRUD'}
    </button>
    {isOpen && (
      <div>
        <h1>County CRUD for ADMIN</h1>
      <CountyGet/>
      <CountyById />
      <CountyPost />
      <CountyPut />
      <CountyDelete />
      </div>
    )}
  </div>
);
}

export default CountyDisplay;
