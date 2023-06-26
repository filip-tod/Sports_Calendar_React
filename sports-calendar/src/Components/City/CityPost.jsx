import React, { useState } from 'react';
import axios from 'axios';


const CityPost = () => {
  const [city, setCity] = useState({
    Id: "",
  Name: "",
    IsActive: true,
    UpdatedByUserId: "affb4f68-ae4f-4118-9c4d-0b4aa97324d4",
    CreatedByUserId: "affb4f68-ae4f-4118-9c4d-0b4aa97324d4",
    DateCreated: "2023-06-13T00:00:00Z",
    DateUpdated: "2023-06-13T00:00:00Z"
  });

  const handleCityNameChange = event => {
    setCity(prevCity => ({
      ...prevCity,
      Name: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post('https://localhost:44380/api/City/', city)
      .then(response => {
        console.log(response.data);

      })
      .catch(error => {
        console.error(error);
   
      });
  };

  return (
    <div>
      <h3>Create a City</h3>
      <form onSubmit={handleSubmit}>
        <label>
          City Name:
          <input type="text" value={city.Name} onChange={handleCityNameChange} />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CityPost;
