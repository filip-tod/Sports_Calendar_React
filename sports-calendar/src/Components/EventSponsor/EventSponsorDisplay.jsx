import React from "react";
import EventSponsorList from "./EventSponsorList";
import EventSponsorPost from "./EventSponsorPost";

function EventSponsorDisplay({ currentEventId, isMainEditClicked }) {
  return (
    <div className="sponsorDisplayDiv">
      <EventSponsorList currentEventId={currentEventId} isMainEditClicked={isMainEditClicked} />
      {isMainEditClicked && (
        <EventSponsorPost currentEventId={currentEventId} />
      )}
    </div>
  );
}

export default EventSponsorDisplay;
