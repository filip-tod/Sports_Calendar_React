import React from "react";
import { PlacementPagedList } from "./PlacementPages";
import CreateForm from "./PlacementPost";
import { useState } from "react";
function PlacementDisplay({ currentEventId, isMainEditClicked  }) {
  const [updateList, setUpdateList] = useState(false);

  const tokenData = JSON.parse(localStorage.getItem('token'));
  const userId = tokenData ? tokenData.Id : null;

  console.log(userId);

  return (
    <div className="pDisplayDiv">
      <PlacementPagedList
        currentEventId={currentEventId}
        isMainEditClicked={isMainEditClicked}
        updateList={updateList}
      />
      {isMainEditClicked && <CreateForm setUpdateList={setUpdateList} currentEventId={currentEventId} userId={userId}  />}
    </div>
  );
}

export default PlacementDisplay;
