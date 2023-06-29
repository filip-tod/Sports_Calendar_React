import React from "react";
import { PlacementPagedList } from "./PlacementPages";
import CreateForm from "./PlacementPost";

function PlacementDisplay({ currentEventId, isMainEditClicked }) {
  return (
    <div className="pDisplayDiv">
      <PlacementPagedList currentEventId={currentEventId} isMainEditClicked={isMainEditClicked} />
      <CreateForm currentEventId={currentEventId} />
    </div>
  );
}

export default PlacementDisplay;
