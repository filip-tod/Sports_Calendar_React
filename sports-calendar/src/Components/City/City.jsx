import React, { useState } from 'react';
import axios from 'axios';
import CityService from '../../Services/CityService';

const City = () => {
  const [cities, setCities] = useState([]);
  //privremeno rješenje gdje sa stateom upravljam sa fetch buttonom
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = () => {
    CityService.getCitys().then((response)=>{
      const { data } = response;
          setCities(data.map(city => city.Name));
          console.log(response.data);
          setDataFetched(true);
    }).catch((e)=>{
      console.log(e);
    });
    // if (!dataFetched) {
    //   axios
    //     .get('https://localhost:44380/api/City')
    //     .then(response => {
    //       const { data } = response;
    //       setCities(data.map(city => city.Name));
    //       console.log(response.data);
    //       setDataFetched(true);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }

  };

  return (
    <div>
      <button onClick={fetchData} disabled={dataFetched}>
        Fetch Data
      </button>
      {cities.length > 0 && (
        <div>
          <h3>Cities:</h3>
          <ul>
            {cities.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>
      )}
      {cities.length === 0 && dataFetched && <p>No cities available</p>}
    </div>
  );
};

export default City;
