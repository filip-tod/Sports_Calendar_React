import React from "react";
import  EventSponsorList  from "./EventSponsorList";
import CreateEventSponsorForm from "./EventSponsorPost";
import { useState } from "react";

function EventSponsorDisplay({ currentEventId, isMainEditClicked }) {
  const [updateList, setUpdateList] = useState(false);

  return (
    <div className="sponsorDisplayDiv">
      <EventSponsorList
        currentEventId={currentEventId}
        isMainEditClicked={isMainEditClicked}
        updateList={updateList}
      />
      {isMainEditClicked && (
        <CreateEventSponsorForm
          setUpdateList={setUpdateList}
          currentEventId={currentEventId}
        />
      )}
    </div>
  );
}

export default EventSponsorDisplay;
