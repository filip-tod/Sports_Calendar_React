import React, { useState, useEffect } from "react";
import SponsorService from "../../Services/SponsorService";
import SponsorList from "./SponsorPages";
import SponsorPost from "./SponsorPost";

function SponsorDisplay({ currentEventId, isMainEditClicked }) {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetchSponsors();
  }, [currentEventId]);

  const fetchSponsors = async () => {
    try {
      const response = await SponsorService.getSponsors();
      const sponsorsData = response.data;
      const filteredSponsors = sponsorsData.filter(
        (sponsor) => sponsor.eventId === currentEventId
      );
      setSponsors(filteredSponsors);
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
        sponsors={sponsors}
        currentEventId={currentEventId}
        isMainEditClicked={isMainEditClicked}
        fetchSponsors={fetchSponsors}
      />
      <SponsorPost onAddSponsor={addSponsor} />
    </div>
  );
}

export default SponsorDisplay;