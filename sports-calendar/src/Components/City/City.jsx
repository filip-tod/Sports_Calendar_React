import React, { useState } from "react";
import { Link } from "react-router-dom";
import CityService from "../../Services/CityService";

const CityDisplay = () => {
  const [cities, setCities] = useState([]);
  

  const fetchData = () => {
    CityService.getCitys()
      .then((response) => {
        const { data } = response;
        setCities(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteCity = (cityId) => {
    // Find the city in the local state
    const cityToBeDeleted = cities.find(city => city.id === cityId);
    
    if (cityToBeDeleted) {
      // Prepare the updated city data
      const updatedCity = {
        ...cityToBeDeleted,
        Name: "DELETED",
        UpdatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
        DateUpdated: new Date(Date.UTC()),
        IsActive: false
      };
  
      // Call the service to update the city
      CityService.updateCity(cityId, updatedCity)
        .then(() => {
          // Update the local state
          setCities(cities => cities.map(city => city.id === cityId ? updatedCity : city));
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.error(`City with ID ${cityId} not found.`);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {cities.length > 0 && (
        <div>
          <h3>Cities:</h3>
          <ul>
            {cities.map((city) => {
              console.log(city);
              return (
                <li key={city.id}>
                  {city.name}
                  <Link to={`/update-city/${city.id}`}>Update</Link>
                  <button onClick={() => handleDeleteCity(city.id)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {cities.length === 0 && <p>No cities available</p>}
    </div>
  );
};

export default CityDisplay;
