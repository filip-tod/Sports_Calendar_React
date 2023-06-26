import React, { useState } from 'react';
import axios from 'axios';

const CountyById = () => {
  const [county, setCounty] = useState({
    Id: "",
    Name: "",
    IsActive: false
  });
  const [id, setId] = useState('');

  const fetchCountyById = () => {
    axios
      .get(`https://localhost:44380/api/County/${id}`)
      .then(response => {
        const data = response.data;
        if (data.length > 0) {
          setCounty(data[0]);
          console.log(data[0]);
        } else {
          console.log('No county found with this ID');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  

  const handleInputChange = event => {
    setId(event.target.value);
  };

  return (
    <div>
      <input type="text" value={id} onChange={handleInputChange} />
      <button onClick={fetchCountyById}>Get County by Id</button>
        <div>
            <ul>
          <p>County name: {county.Name}</p>
          <p>County id: {county.Id}</p>
          </ul>
        </div>
    </div>
  );
};

export default CountyById;
