import React, { useState, useEffect } from 'react';
import LocationService from '../../Services/LocationService';
import CityService from '../../Services/CityService';
import CountyService from '../../Services/CountyService';
import { v4 as uuidv4 } from 'uuid'; // import UUID generator

function CreateLocation() {


  const [location, setLocation] = useState({
    Id: uuidv4(), // Generate a new UUID for the location
    Venue: "",
    UpdatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
    CreatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
    CountyId: "",
    CityId: "",
    DateCreated: new Date(Date.UTC()),
    DateUpdated: new Date(Date.UTC()),
    IsActive: true,
  });

  const handleInputChange = event => {
    //Here //
    const { name, value } = event.target;
    setLocation({ ...location, [name]: value });
  };

  const createNewLocation = () => {
    LocationService.createLocation(location)
    .then(response => {
      console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const [cities, setCities] = useState([]);
  const [counties, setCounties] = useState([]);

  useEffect(() => {
    CityService.getCitys()
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    // Fetch counties
    CountyService.getCounties()
      .then(response => {
        setCounties(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Create New Location</h2>
      <form>
        <label>
          Venue:
          <input type="text" name="Venue" value={location.Venue} onChange={handleInputChange} />
        </label>
        <label>
          <h1>City</h1>
          <select name="CityId" value={location.CityId} onChange={handleInputChange}>
  {cities.map(city => (
    <option key={city.id} value={city.id}>{city.name}</option>
  ))}
</select>

        </label>
        <label>
          <h1>County</h1>
          <select name="CountyId" value={location.CountyId} onChange={handleInputChange}>
            {counties.map(county => (
              <option key={county.id} value={county.id}>{county.name}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={createNewLocation}>Create</button>
      </form>
    </div>
  );

}

export default CreateLocation;
