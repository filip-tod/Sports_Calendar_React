import React from "react";
import PlacementPagedList from "./PlacementPages";

function PlacementDisplay() {
  const currentEventId = localStorage.getItem('token'); 

  return (
    <div className="pDisplayDiv">
      <PlacementPagedList currentEventId={currentEventId} />
    </div>
  );
}

export default PlacementDisplay;
