import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LocationService from '../../Services/LocationService';


const UpdateLocation = () => {
  const { id } = useParams();
  const [location, setLocation] = useState({
    Id: "",
    Venue: "",
    UpdatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
    CreatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
    CountyId: "fb0fd01f-3f14-4a3a-9746-883468fb8490",
    CityId: "a7e5f870-2aa9-4c29-bbe7-1bcbfc2292e8",
    DateCreated: new Date(Date.UTC()),
    DateUpdated: new Date(Date.UTC()),
    IsActive: true
  });

  useEffect(() => {
    LocationService.fetchCityById(id)
      .then(response => {
        const locationData = response.data;
        setLocation(locationData);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleVenueNameChange = event => {
    setLocation(prevLocation => ({
      ...prevLocation,
      Venue: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    LocationService.updateLocation(id, location)
      .then(response => {
        console.log(response.data);
        // Handle successful update
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  };
  console.log(location.data);

  return (
    <div>
      <h3>Update Location</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Venue Name:
          <input type="text" value={location.Venue} onChange={handleVenueNameChange} />
      
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateLocation;
