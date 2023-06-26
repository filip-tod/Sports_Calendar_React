import React, { useState } from 'react';
import City from './City';
import CityById from './CityById';
import CityDelete from './CityDelete';
import CityPost from './CityPost';
import CityPut from './CityPut';

function CityDisplay() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleVisibility = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isOpen ? 'Close City CRUD' : 'Open City CRUD'}
      </button>
      {isOpen && (
        <div>
          <h1>City CRUD for Admin</h1>
          <City />
          <CityById />
          <CityPost />
          <CityPut />
          <CityDelete />
        </div>
      )}
    </div>
  );
}

export default CityDisplay;
