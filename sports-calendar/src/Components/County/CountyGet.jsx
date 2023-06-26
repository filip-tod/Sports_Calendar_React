import React, { useState } from 'react';
import axios from 'axios';

function CountyGet() {
  const [counties, setCounties] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = () => {
    if (!dataFetched) {
      axios
        .get('https://localhost:44380/api/County')
        .then(response => {
          const { data } = response;
          setCounties(data.map(county => county.Name));
          console.log(response.data);
          setDataFetched(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <button onClick={fetchData}>
        Fetch Data
      </button>
      {counties.length > 0 && (
        <div>
          <h3>Counties:</h3> {/* Updated heading to "Counties" */}
          <ul>
            {counties.map((county, index) => (
              <li key={index}>{county}</li> 
            ))}
          </ul>
        </div>
      )}
      {counties.length === 0 && dataFetched && <p>No counties available</p>} {/* Updated the message to "No counties available" */}
    </div>
  );
}

export default CountyGet;
