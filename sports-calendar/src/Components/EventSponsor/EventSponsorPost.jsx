import React, { useState } from 'react';
import EventSponsorService from '../../Services/EventSponsorService';

function EventSponsorPost({ eventId, onAddEventSponsor }) {
  const [newEventSponsorName, setNewEventSponsorName] = useState('');
  const [newEventSponsorWebsite, setNewEventSponsorWebsite] = useState('');

  const handleNameChange = (e) => {
    setNewEventSponsorName(e.target.value);
  };

  const handleWebsiteChange = (e) => {
    setNewEventSponsorWebsite(e.target.value);
  };

  const addEventSponsor = async () => {
    try {
      const newEventSponsor = {
        name: newEventSponsorName,
        website: newEventSponsorWebsite,
        eventId: eventId,
      };
      await EventSponsorService.createEventSponsor(newEventSponsor);
      onAddEventSponsor();
      setNewEventSponsorName('');
      setNewEventSponsorWebsite('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add Event Sponsor</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={newEventSponsorName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label>Website:</label>
        <input
          type="text"
          value={newEventSponsorWebsite}
          onChange={handleWebsiteChange}
        />
      </div>
      <button onClick={addEventSponsor}>Add Event Sponsor</button>
    </div>
  );
}

export default EventSponsorPost;
