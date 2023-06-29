import React, { useState } from "react";
import PlacementPagedList from "./PlacementPages";

function PlacementDisplay(currentEventId) {
  return (
    <div className="pDisplayDiv">
      <PlacementPagedList currentEventId={currentEventId} />
    </div>
  );
}

export default PlacementDisplay;
