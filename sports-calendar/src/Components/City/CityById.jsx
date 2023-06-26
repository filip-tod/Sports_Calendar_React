import React, { useState } from 'react';
import axios from 'axios';

const CityById = () => {
  const [city, setCity] = useState({});
  const [id, setId] = useState('');

  const fetchCityById = () => {
    axios
      .get(`https://localhost:44380/api/City/${id}`)
      .then(response => {
        const data = response.data;
        setCity(data[0]);  // Update this line
        console.log(data[0]);  // Log the first object from the array
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  

  const handleInputChange = event => {
    setId(event.target.value);
  };

  React.useEffect(() => {
    console.log(city);
  }, [city]);
  
  return (
    <div>
      <input type="text" value={id} onChange={handleInputChange} />
      <button onClick={fetchCityById}>Get City by Id</button>
      {Object.keys(city).length !== 0 ? (
        <div>
          <p>City: {city.Name}</p>
        </div>
      ) : (
        <p>No city available</p>
      )}
    </div>
  );
  
};

export default CityById;
