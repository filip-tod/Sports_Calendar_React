import React, { useState, useEffect } from "react";
import SponsorList from "./SponsorPages";
import SponsorPost from "./SponsorPost";
import SponsorService from "../../Services/SponsorService";
import EventSponsorService from "../../Services/EventSponsorService";
function SponsorDisplay({ currentEventId, isMainEditClicked }) {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const responseAllSponsors = await SponsorService.getSponsors();
      const allSponsors = responseAllSponsors.data;
      console.log(allSponsors);

      const response = await EventSponsorService.getSponsors();
      const sponsorsData = response.data;
      const filteredSponsors = sponsorsData.filter(
        (sponsor) => sponsor.eventId === currentEventId
      );
      console.log(sponsorsData);
      console.log(filteredSponsors);

      const matchingSponsors = allSponsors.filter((sponsor) =>
        filteredSponsors.some(
          (filteredSponsor) => filteredSponsor.sponsorId === sponsor.id
        )
      );
      console.log(matchingSponsors);

      setSponsors(matchingSponsors);
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
      <SponsorList
        isMainEditClicked={isMainEditClicked}
      />
      <SponsorPost onAddSponsor={addSponsor} />
    </div>
  );
}

export default SponsorDisplay;
