import React, { useState } from 'react';
import axios from 'axios';

const CountyPost = () => {
  const [county, setCounty] = useState({
    Id: "",
    Name: "",
    IsActive: true,
    UpdatedByUserId: "affb4f68-ae4f-4118-9c4d-0b4aa97324d4",
    CreatedByUserId: "affb4f68-ae4f-4118-9c4d-0b4aa97324d4",
    DateCreated: "2023-06-13T00:00:00Z",
    DateUpdated: "2023-06-13T00:00:00Z"
  });

  const handleCountyNameChange = event => {
    setCounty(prevCounty => ({
      ...prevCounty,
      Name: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post('https://localhost:44380/api/County/', county)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h3>Create a County</h3>
      <form onSubmit={handleSubmit}>
        <label>
          County Name:
          <input type="text" value={county.Name} onChange={handleCountyNameChange} />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CountyPost;
