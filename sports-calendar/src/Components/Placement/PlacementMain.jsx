import React from "react";
import { PlacementPagedList } from "./PlacementPages";
import CreateForm from "./PlacementPost";
import { useState } from "react";
function PlacementDisplay({ currentEventId, isMainEditClicked }) {
  const [updateList, setUpdateList] = useState(false);

  return (
    <div className="pDisplayDiv">
      <PlacementPagedList
        currentEventId={currentEventId}
        isMainEditClicked={isMainEditClicked}
        updateList={updateList}
      />
      {isMainEditClicked && <CreateForm setUpdateList={setUpdateList} currentEventId={currentEventId} />}
    </div>
  );
}

export default PlacementDisplay;
