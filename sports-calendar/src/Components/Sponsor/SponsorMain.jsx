import React, { useState, useEffect } from 'react';
import SponsorList from './SponsorPages';
import SponsorPost from './SponsorPost';
import SponsorService from '../../Services/SponsorService';

function SponsorDisplay({isMainEditClicked}) {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response = await SponsorService.getSponsors();
      const sponsorsData = response.data;
      setSponsors(sponsorsData);
    } catch (error) {
      console.log(error);
    }
  };

  const addSponsor = async () => {
    try {
      await fetchSponsors();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sDisplayDiv">
      <SponsorList sponsors={sponsors} fetchSponsors={fetchSponsors} isMainEditClicked={isMainEditClicked} />
      <SponsorPost onAddSponsor={addSponsor} />
    </div>
  );
}

export default SponsorDisplay;
