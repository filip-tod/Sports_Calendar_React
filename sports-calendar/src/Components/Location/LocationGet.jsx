import React, { useState } from 'react';
import axios from 'axios';

const LocationGet = () => {
  const [locations, setLocations] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = () => {
    if (!dataFetched) {
      axios
        .get('https://localhost:44380/api/Location')
        .then(response => {
          const { data } = response;
          setLocations(data.map(location => ({
            Id: location.Id,
            IsActive: location.IsActive,
            Venue: location.Venue,
            CityName: location.City.Name,
            CountyName: location.County.Name
          })));
          console.log(response.data);
          setDataFetched(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={dataFetched}>
        Fetch Data
      </button>
      {locations.length > 0 && (
        <div>
          <h3>Locations:</h3>
          <ul>
            {locations.map(location => (
              <li key={location.Id}>
                <p>Location ID: {location.Id}</p>
                <p>Venue: {location.Venue}</p>
                <p>City: {location.CityName}</p>
                <p>County: {location.CountyName}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {locations.length === 0 && dataFetched && <p>No locations available</p>}
    </div>
  );
};

export default LocationGet;
