import React, { useState } from 'react';
import CountyGetById from './CountyById';
import CountyGetForm from './County';




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
      <CountyGetById />
      <CountyGetForm />
      </div>
    )}
  </div>
);
}

export default CountyDisplay;
