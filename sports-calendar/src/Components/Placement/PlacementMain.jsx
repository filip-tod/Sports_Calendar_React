import React from "react";
import PlacementPagedList from "./PlacementPages";

function PlacementDisplay() {
  const currentEventId = "5b452225-8a90-4345-8868-65e794ff0577"; 

  return (
    <div className="pDisplayDiv">
      <PlacementPagedList currentEventId={currentEventId} />
    </div>
  );
}

export default PlacementDisplay;
