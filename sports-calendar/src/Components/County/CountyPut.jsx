import React, { useState } from 'react';
import axios from 'axios';

const CountyPut = () => {
  const [county, setCounty] = useState({
    Id: "",
    Name: "",
    UpdatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
    CreatedByUserId: "affb4f68-ae4f-4118-9c4d-0b4aa97324d4",
    DateCreated: new Date(Date.UTC()),
    DateUpdated: new Date(Date.UTC()),
    IsActive: true
  });

  const handleCityNameChange = event => {
    setCounty(prevCounty => ({
      ...prevCounty,
      Name: event.target.value
    }));
  };

  const handleIdChange = event => {
    const newId = event.target.value;
    setCounty(prevCounty => ({
      ...prevCounty,
      Id: newId
    }));


    if (newId !== "") {
      axios
        .get(`https://localhost:44380/api/County/${newId}`)
        .then(response => {
          const countyData = response.data;
          setCounty(prevCounty => ({
            ...prevCounty,
            Name: countyData.Name,
            IsActive: countyData.IsActive
          }));
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .put(`https://localhost:44380/api/County/${county.Id}`, county)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h3>Update County</h3>
      <form onSubmit={handleSubmit}>
        <label>
          County GUID:
          <input type="text" value={county.Id} onChange={handleIdChange} />
        </label>
        <label>
          County Name:
          <input type="text" value={county.Name} onChange={handleCityNameChange} />
        </label>
        <label>
          Still active?
          <input type="checkbox" checked={county.IsActive} onChange={() => setCounty(prevCity => ({ ...prevCity, IsActive: !prevCity.IsActive }))} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default CountyPut;
