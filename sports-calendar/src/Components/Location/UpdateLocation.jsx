import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LocationService from '../../Services/LocationService';

const UpdateLocation = () => {
  const { id } = useParams();
  const [location, setLocation] = useState({
    Id: "",
    Venue: "",
    CityName: "",
    CountyName: "",
    UpdatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
    CreatedByUserId: "affb4f68-ae4f-4118-9c4d-0b4aa97324d4",
    DateCreated: new Date(Date.UTC()),
    DateUpdated: new Date(Date.UTC()),
    IsActive: true
  });

  useEffect(() => {
    LocationService.fetchLocationById(id)
      .then(response => {
        const locationData = response.data;
        setLocation(locationData);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleInputChange = (event, field) => {
    setLocation(prevLocation => ({
      ...prevLocation,
      [field]: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    LocationService.updateLocation(id, location)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h3>Update Location</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Venue:
          <input type="text" value={location.Venue} onChange={(e) => handleInputChange(e, "Venue")} />
        </label>
        <label>
          City Name:
          <input type="text" value={location.CityName} onChange={(e) => handleInputChange(e, "CityName")} />
        </label>
        <label>
          County Name:
          <input type="text" value={location.CountyName} onChange={(e) => handleInputChange(e, "CountyName")} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateLocation;
