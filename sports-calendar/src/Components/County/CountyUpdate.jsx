import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountyService from '../../Services/CountyService';

const UpdateCounty = () => {
  const { id } = useParams();
  const [county, setCounty] = useState({
    Id: "",
    Name: "",
    UpdatedByUserId: "0d3fa5c2-684c-4d88-82fd-cea2197c6e86",
    CreatedByUserId: "affb4f68-ae4f-4118-9c4d-0b4aa97324d4",
    DateCreated: new Date(Date.UTC()),
    DateUpdated: new Date(Date.UTC()),
    IsActive: true
  });

  useEffect(() => {
    CountyService.fetchCountyById(id)
      .then(response => {
        const countyData = response.data;
        setCounty(countyData);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleCountyNameChange = event => {
    setCounty(prevCounty => ({
      ...prevCounty,
      Name: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    CountyService.updateCounty(id, county)
      .then(response => {
        console.log(response.data);
        // Handle successful update
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div>
      <h3>Update County</h3>
      <form onSubmit={handleSubmit}>
        <label>
          County Name:
          <input type="text" value={county.Name} onChange={handleCountyNameChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCounty;
