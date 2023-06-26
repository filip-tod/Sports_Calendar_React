import React, { useState } from 'react';
import axios from 'axios';

const CityDelete = () => {
  const [city, setCity] = useState({
    Id: "",
    Name: "",
    UpdatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
    CreatedByUserId: "affb4f68-ae4f-4118-9c4d-0b4aa97324d4",
    DateCreated: new Date(Date.UTC()),
    DateUpdated: new Date(Date.UTC()),
    IsActive: false
  });

 

  const handleIdChange = event => {
    const newId = event.target.value;
    setCity(prevCity => ({
      ...prevCity,
      Id: newId
    }));

    // Fetch city details based on the entered Id
    if (newId !== "") {
      axios
        .get(`https://localhost:44380/api/City/${newId}`)
        .then(response => {
          const cityData = response.data;
          setCity(prevCity => ({
            ...prevCity,
            Name: cityData.Name,
            IsActive: cityData.IsActive
          }));
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .delete(`https://localhost:44380/api/City/${city.Id}`, city)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h3>City To Delete</h3>
      <form onSubmit={handleSubmit}>
        <label>
          City GUID:
          <input type="text" value={city.Id} onChange={handleIdChange} />
        </label>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default CityDelete;
