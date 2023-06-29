import React, { useState, useEffect } from 'react';
import '../../Style/placementPages.css';
import SponsorService from '../../Services/SponsorService';

function SponsorList() {
  const [sponsors, setSponsors] = useState([]);
  const [newSponsorName, setNewSponsorName] = useState('');
  const [newSponsorWebsite, setNewSponsorWebsite] = useState('');
  const [selectedSponsorId, setSelectedSponsorId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response = await SponsorService.getSponsors();
      const sponsorsData = response.data;
      setSponsors(sponsorsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (e) => {
    setNewSponsorName(e.target.value);
  };

  const handleWebsiteChange = (e) => {
    setNewSponsorWebsite(e.target.value);
  };

  const selectSponsor = (sponsorId) => {
    setSelectedSponsorId(sponsorId);
    const selectedSponsor = sponsors.find((sponsor) => sponsor.id === sponsorId);
    setNewSponsorName(selectedSponsor.name);
    setNewSponsorWebsite(selectedSponsor.website);
    setIsUpdating(true);
  };

  const cancelUpdate = () => {
    setIsUpdating(false);
    setSelectedSponsorId(null);
    setNewSponsorName('');
    setNewSponsorWebsite('');
  };

  const updateSponsor = async () => {
    try {
      const updatedSponsor = {
        name: newSponsorName,
        website: newSponsorWebsite,
      };
      await SponsorService.updateSponsor(selectedSponsorId, updatedSponsor);
      fetchSponsors();
      setIsUpdating(false);
      setSelectedSponsorId(null);
      setNewSponsorName('');
      setNewSponsorWebsite('');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSponsor = async (id) => {
    try {
      await SponsorService.removeSponsor(id);
      setSponsors((prevSponsors) =>
        prevSponsors.filter((sponsor) => sponsor.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addSponsor = () => {
    fetchSponsors();
  };

  const renderSponsors = () => {
    return sponsors.map((sponsor) => (
      <div key={sponsor.id}>
        <p>Name: {sponsor.name}</p>
        <p>Website: {sponsor.website}</p>
        <button onClick={() => selectSponsor(sponsor.id)}>Edit</button>
        <button onClick={() => deleteSponsor(sponsor.id)}>Delete</button>
        <hr />
      </div>
    ));
  };

  return (
    <div className="sponsor-list">
      <h1>Sponsor List</h1>
      <div className="sponsor-container">{renderSponsors()}</div>

      {isUpdating && (
        <div>
          <h2>Update Sponsor</h2>
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
          <button onClick={updateSponsor}>Update Sponsor</button>
          <button onClick={cancelUpdate}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default SponsorList;
