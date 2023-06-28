import React, { useState, useEffect } from 'react';
import LocationService from '../../Services/LocationService';
import { useNavigate } from 'react-router-dom'; // import the useNavigate hook

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [isLocationsVisible, setIsLocationsVisible] = useState(false);

  const navigate = useNavigate(); // initialize the useNavigate hook

  const fetchLocations = () => {
    LocationService.getLocations()
      .then(response => {
        setLocations(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const toggleLocationsVisibility = () => {
    setIsLocationsVisible(!isLocationsVisible);
  };

  useEffect(() => {
    if (isLocationsVisible) {
      fetchLocations();
    }
  }, [isLocationsVisible]);

  return (
    <div>
      <h2>Locations</h2>
      <button onClick={toggleLocationsVisibility}>
        {isLocationsVisible ? 'Hide Locations' : 'Show Locations'}
      </button>
      {isLocationsVisible && (
        <div>
          {locations.map((location) => (
            <div key={location.id}>
              <ul>
                <li><strong>Venue:</strong> {location.venue}</li>
                <li><strong>City:</strong> {location.cityName}</li>
                <li><strong>County:</strong> {location.countyName}</li>
                <li><strong>Active:</strong> {location.IsActive ? 'Yes' : 'No'}</li>
              </ul>
              <button onClick={() => navigate(`/update-location/${location.id}`)}>
                Update
              </button> {/* Update button for each location */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationList;
