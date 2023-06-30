import React, { useState } from "react";
import { Link } from "react-router-dom";
import CountyService from "../../Services/CountyService";

const CountyGetForm = () => {
  const [counties, setCounties] = useState([]);
  

  const fetchData = () => {
    CountyService.getCounties()
      .then((response) => {
        const { data } = response;
        setCounties(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteCounty = (countyId) => {
    // Find the county in the local state
    const countyToBeDeleted = counties.find(county => county.id === countyId);
    
    if (countyToBeDeleted) {
      // Prepare the updated county data
      const updatedCounty = {
        ...countyToBeDeleted,
        Name: "DELETED",
        UpdatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
        DateUpdated: new Date(Date.UTC()),
        IsActive: false
      };
  
      // Call the service to update the county
      CountyService.updateCounty(countyId, updatedCounty)
        .then(() => {
          // Update the local state
          setCounties(counties => counties.map(county => county.id === countyId ? updatedCounty : county));
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.error(`County with ID ${countyId} not found.`);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {counties.length > 0 && (
        <div>
          <h3>Counties:</h3>
          <ul>
            {counties.map((county) => {
              console.log(county);
              return (
                <li key={county.id}>
                  {county.name}
                  <Link to={`/update-county/${county.id}`}>Update</Link>
                  <button onClick={() => handleDeleteCounty(county.id)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {counties.length === 0 && <p>No counties available</p>}
    </div>
  );
};

export default CountyGetForm;
