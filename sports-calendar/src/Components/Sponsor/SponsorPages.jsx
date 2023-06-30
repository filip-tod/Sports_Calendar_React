import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import SponsorService from "../../Services/SponsorService";

function SponsorList({ currentEventId, isMainEditClicked }) {
  const [sponsors, setSponsors] = useState([]);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [updateFormName, setUpdateFormName] = useState("");
  const [updateFormWebsite, setUpdateFormWebsite] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSponsors();
  }, [currentEventId]);

  const fetchSponsors = async () => {
    try {
      const response = await SponsorService.getSponsors();
      const sponsorsData = response.data;
      const filteredSponsors = sponsorsData.filter(
        (sponsor) => sponsor.eventId === currentEventId
      );
      setSponsors(filteredSponsors);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSponsor = async () => {
    if (selectedSponsor) {
      const sponsorId = selectedSponsor;
      try {
        await SponsorService.removeSponsor(sponsorId);
        console.log(`Sponsor with ID ${sponsorId} deleted successfully.`);
        fetchSponsors();
        setSelectedSponsor(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateSponsor = async () => {
    if (selectedSponsor) {
      const sponsorId = selectedSponsor;
      const updatedSponsor = {
        id: sponsorId,
        name: updateFormName,
        website: updateFormWebsite,
      };
      try {
        await SponsorService.updateSponsor(sponsorId, updatedSponsor);
        console.log(`Sponsor with ID ${sponsorId} updated successfully.`);
        setShowUpdateForm(false);
        setUpdateFormName("");
        setUpdateFormWebsite("");
        fetchSponsors();
        setSelectedSponsor(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openUpdateModal = (sponsor) => {
    setSelectedSponsor(sponsor.id);
    setUpdateFormName(sponsor.name);
    setUpdateFormWebsite(sponsor.website);
    setShowUpdateForm(true);
  };

  const deleteSponsor = (sponsorId) => {
    setSelectedSponsor(sponsorId);
    setIsModalOpen(true);
  };

  const renderSponsors = () => {
    if (!sponsors || sponsors.length === 0) {
      return <ListGroupItem>No sponsors available</ListGroupItem>;
    }

    return sponsors.map((sponsor) => (
      <ListGroupItem key={sponsor.id} className="square border border-2">
        <p>Name: {sponsor.name}</p>
        <p>Website: {sponsor.website}</p>
        {isMainEditClicked && (
          <>
            <Button onClick={() => openUpdateModal(sponsor)} className="me-4">
              Update
            </Button>
            <Button color="danger" onClick={() => deleteSponsor(sponsor.id)}>
              Delete
            </Button>
          </>
        )}
      </ListGroupItem>
    ));
  };

  return (
    <div>
      <ListGroup className="text-center">{renderSponsors()}</ListGroup>

      <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
        <ModalHeader>Delete Sponsor</ModalHeader>
        <ModalBody>Are you sure you want to delete this sponsor?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteSponsor}>
            Delete
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={showUpdateForm}
        toggle={() => setShowUpdateForm(!showUpdateForm)}
      >
        <ModalHeader>Update Sponsor</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Name"
            value={updateFormName}
            onChange={(e) => setUpdateFormName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Website"
            value={updateFormWebsite}
            onChange={(e) => setUpdateFormWebsite(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateSponsor}>
            Update
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => setShowUpdateForm(!showUpdateForm)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SponsorList;