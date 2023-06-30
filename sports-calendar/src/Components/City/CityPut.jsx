import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CityService from '../../Services/CityService';

const UpdateCity = () => {
  const { id } = useParams();
  const [city, setCity] = useState({
    Id: "",
    Name: "",
    UpdatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
    CreatedByUserId: "affb4f68-ae4f-4118-9c4d-0b4aa97324d4",
    DateCreated: new Date(Date.UTC()),
    DateUpdated: new Date(Date.UTC()),
    IsActive: true
  });

  useEffect(() => {
    CityService.fetchCityById(id)
      .then(response => {
        const cityData = response.data;
        setCity(cityData);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleCityNameChange = event => {
    setCity(prevCity => ({
      ...prevCity,
      Name: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(city);
    CityService.updateCity(id, city)
      .then(response => {
        console.log(response.data);
        // Handle successful update
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div>
      <h3>Update City</h3>
      <form onSubmit={handleSubmit}>
        <label>
          City Name:
          <input type="text" value={city.Name} onChange={handleCityNameChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCity;
