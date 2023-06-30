import React, { useState } from 'react';
import CityService from '../../Services/CityService';
import { Link } from 'react-router-dom';

const CityById = () => {
  const [city, setCity] = useState({});
  const [id, setId] = useState('');
  

  const fetchCityById = (id) => {
    CityService.fetchCityById(id)
      .then(response => {
        const { data } = response;
        setCity(data[0]);  // Update state with the retrieved city
        console.log(data[0]);  // Log the first object from the array
      })
      .catch(error => {
        console.error(error);
      });
  };



  const deleteCity = () => {
    CityService.deleteCity(id)
      .then(response => {
        console.log(response);  // Log the response
        setCity({});  // Reset city object
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
      <button onClick={() => fetchCityById(id)}>Get City by Id</button>
      {Object.keys(city).length !== 0 ? (
        <div>
          <p>City: {city.Name}</p>
          <Link to={`/update-city/${city.Id}`}>Update</Link>
          <button onClick={deleteCity}>Delete City</button>
        </div>
      ) : (
        <p>No city available</p>
      )}
    </div>
  );
  
};

export default CityById;
