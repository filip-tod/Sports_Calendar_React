import React, { useState } from 'react';
import CountyService from '../../Services/CountyService';
import { Link } from 'react-router-dom';

const CountyGetById = () => {
  const [county, setCounty] = useState({});
  const [id, setId] = useState('');
  

  const fetchCountyById = (id) => {
    CountyService.fetchCountyById(id)
      .then(response => {
        const { data } = response;
        setCounty(data[0]);  // Update state with the retrieved county
        console.log(data[0]);  // Log the first object from the array
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteCounty = () => {
    CountyService.deleteCounty(id)
      .then(response => {
        console.log(response);  // Log the response
        setCounty({});  // Reset county object
      })
      .catch(error => {
        console.error(error);
      });
  };


  const handleInputChange = event => {
    setId(event.target.value);
  };
  

  React.useEffect(() => {
    console.log(county);
  }, [county]);

  return (
    <div>
      <input type="text" value={id} onChange={handleInputChange} />
      <button onClick={() => fetchCountyById(id)}>Get County by Id</button>
      {Object.keys(county).length !== 0 ? (
        <div>
          <p>County: {county.Name}</p>
          <Link to={`/update-county/${county.Id}`}>Update</Link>
          <button onClick={deleteCounty}>Delete County</button>
        </div>
      ) : (
        <p>No county available</p>
      )}
    </div>
  );
  
};

export default CountyGetById;
