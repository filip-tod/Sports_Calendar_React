import React, { useState } from "react";
import { Link } from "react-router-dom";
import LocationService from "../../Services/LocationService";

const LocationDisplay = () => {
  const [locations, setLocations] = useState([]);

  const fetchData = () => {
    LocationService.getLocations()
      .then((response) => {
        const { data } = response;
        setLocations(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteLocation = (locationId) => {
    LocationService.deleteLocation(locationId)
      .then(() => {
        // Remove deleted location from the local locations list
        setLocations(locations => locations.filter(location => location.Id !== locationId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {locations.length > 0 && (
        <div>
          <h3>Locations:</h3>
          <ul>
            {locations.map((location) => {
              return (
                <li key={location.Id}>
                  {location.Venue}, {location.CityName}, {location.CountyName}
                  <Link to={`/update-location/${location.Id}`}>Update</Link>
                  <button onClick={() => handleDeleteLocation(location.Id)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {locations.length === 0 && <p>No locations available</p>}
    </div>
  );
};

export default LocationDisplay;
