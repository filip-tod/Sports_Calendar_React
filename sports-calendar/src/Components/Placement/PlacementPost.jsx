import React, { useState } from 'react';
import PlacementService from '../../Services/PlacementService';

function CreateForm({ setUpdateList, currentEventId, userId }) {
  const [createFormName, setCreateFormName] = useState('');
  const [createFormFinishOrder, setCreateFormFinishOrder] = useState('');
  console.log(userId);

  const handleCreateFormSubmit = async (e) => {
    e.preventDefault();
    console.log();

    try {
      await PlacementService.createPlacement({
        name: createFormName,
        finishOrder: createFormFinishOrder,
        eventId: currentEventId,
        createdByUserId: userId,
      });

      console.log('Placement created successfully.');
      // updateList.updateList=true;
      setUpdateList(true);
      // fetchPlacements();
      setCreateFormName('');
      setCreateFormFinishOrder('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-form">
      <h2>Create Placement</h2>
      <form onSubmit={handleCreateFormSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={createFormName}
            onChange={(e) => setCreateFormName(e.target.value)}
          />
        </div>
        <div>
          <label>Finish Order:</label>
          <input
            type="text"
            value={createFormFinishOrder}
            onChange={(e) => setCreateFormFinishOrder(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateForm;
