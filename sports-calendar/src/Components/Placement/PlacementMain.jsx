import React, { useState } from "react";
import {PlacementPagedList, fetchPlacements} from "./PlacementPages";
import CreateForm from './PlacementPost';

function PlacementDisplay(currentEventId) {
  const handleFetchPlacements = async (page) => {
    await fetchPlacements(page);
  }

  return (
    <div className="pDisplayDiv">
      <PlacementPagedList currentEventId={currentEventId} />
      <CreateForm currentEventId={currentEventId} fetchPlacements={handleFetchPlacements} />
    </div>
  );
}

export default PlacementDisplay;
