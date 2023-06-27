import React, { useState } from 'react';
import LocationService from '../../Services/LocationService';
import { Link } from 'react-router-dom';

const LocationById = () => {
  const [location, setLocation] = useState({});
  const [id, setId] = useState('');

  const fetchLocationById = (id) => {
    LocationService.fetchLocationById(id)
      .then(response => {
        const { data } = response;
        setLocation(data[0]);  
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteLocation = () => {
    LocationService.deleteLocation(id)
      .then(response => {
        console.log(response); 
        setLocation({});  
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleInputChange = event => {
    setId(event.target.value);
  };

  React.useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div>
      <input type="text" value={id} onChange={handleInputChange} />
      <button onClick={() => fetchLocationById(id)}>Get Location by Id</button>
      {Object.keys(location).length !== 0 ? (
        <div>
          <p>Venue: {location.Venue}</p>
          <p>City: {location.CityName}</p>
          <p>County: {location.CountyName}</p>
          <Link to={`/update-location/${location.Id}`}>Update</Link>
          <button onClick={deleteLocation}>Delete Location</button>
        </div>
      ) : (
        <p>No location available</p>
      )}
    </div>
  );
};

export default LocationById;
