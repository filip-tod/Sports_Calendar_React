import React, { useState } from 'react';
import SponsorService from '../../Services/SponsorService';

function AddSponsorForm({ onAddSponsor }) {
  const [newSponsorName, setNewSponsorName] = useState('');
  const [newSponsorWebsite, setNewSponsorWebsite] = useState('');

  const handleNameChange = (e) => {
    setNewSponsorName(e.target.value);
  };

  const handleWebsiteChange = (e) => {
    setNewSponsorWebsite(e.target.value);
  };

  const addSponsor = async () => {
    try {
      const newSponsor = {
        name: newSponsorName,
        website: newSponsorWebsite,
      };
      await SponsorService.createSponsor(newSponsor);
      onAddSponsor();
      setNewSponsorName('');
      setNewSponsorWebsite('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add Sponsor</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={newSponsorName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label>Website:</label>
        <input
          type="text"
          value={newSponsorWebsite}
          onChange={handleWebsiteChange}
        />
      </div>
      <button onClick={addSponsor}>Add Sponsor</button>
    </div>
  );
}

export default AddSponsorForm;
