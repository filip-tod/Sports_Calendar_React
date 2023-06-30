import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import PlacementService from '../../Services/PlacementService';

function PlacementPagedList({ updateList, currentEventId, isMainEditClicked }) {
  const [placements, setPlacements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [orderBy, setOrderBy] = useState('FinishOrder');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [pageSize, setPageSize] = useState(10);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [updateFormName, setUpdateFormName] = useState('');
  const [updateFormFinishOrder, setUpdateFormFinishOrder] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlacement, setCurrentPlacement] = useState({ name: '', finishOrder: '' });
  const [isListUpdated, setIsListUpdated] = useState(updateList);
  const fetchPlacements = async (page) => {
    try {
      const response = await PlacementService.getPlacements({
        orderBy,
        sortOrder,
        pageSize,
        pageNumber: page,
        eventId: currentEventId,
      });

      const responseData = response.data;
      const placementsData = Array.isArray(responseData) ? responseData : responseData.data;

      setPlacements(placementsData);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchInitialPlacements = async () => {
      try {
        const response = await PlacementService.getPlacements({
          orderBy,
          sortOrder,
          pageSize,
          pageNumber: 1,
          eventId: currentEventId,
        });

        const responseData = response.data;
        const placementsData = Array.isArray(responseData) ? responseData : responseData.data;

        setPlacements(placementsData);
        setTotalCount(responseData.totalCount);
        setTotalPages(responseData.totalPages);

        fetchPlacements(1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialPlacements();
  }, []);
  
  useEffect(() => {
    if (isListUpdated) {
      fetchPlacements(1);
      setIsListUpdated(false);
    }
  }, [isListUpdated]);

  useEffect(() => {
    const totalPages = Math.ceil(totalCount / pageSize);
    setTotalPages(totalPages);

    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalCount, pageSize]);

  useEffect(() => {
    if (filtersChanged) {
      fetchPlacements(currentPage);
      setFiltersChanged(false);
    }
  }, [currentPage, filtersChanged]);

  const handlePageChange = (page) => {
    if (page > 0 && page !== currentPage) {
      setCurrentPage(page);
      setFiltersChanged(true);
    }
  };

  const handleFilterConfirm = () => {
    setFiltersChanged(true);
  };

  const handleDeletePlacement = async () => {
    if (selectedPlacement) {
      const placementId = selectedPlacement;
      try {
        await PlacementService.removePlacement(placementId);
        console.log(`Placement with ID ${placementId} deleted successfully.`);
        fetchPlacements(currentPage);
        setSelectedPlacement(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdatePlacement = async () => {
    if (selectedPlacement) {
      const placementId = selectedPlacement;
      const updatedPlacement = {
        name: updateFormName,
        finishOrder: updateFormFinishOrder,
      };
      try {
        await PlacementService.updatePlacement(placementId, updatedPlacement);
        console.log(`Placement with ID ${placementId} updated successfully.`);
        setShowUpdateForm(false);
        setUpdateFormName('');
        setUpdateFormFinishOrder('');
        fetchPlacements(currentPage);
        setSelectedPlacement(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openUpdateModal = (placement) => {
    setSelectedPlacement(placement.id);
    setCurrentPlacement(placement);
    setUpdateFormName(placement.name);
    setUpdateFormFinishOrder(placement.finishOrder);
    setShowUpdateForm(true);
  };

  const deletePlacement = (placementId) => {
    setSelectedPlacement(placementId);
    setIsModalOpen(true);
  };

  const renderPlacements = () => {

    if (placements === undefined) {
      return <ListGroupItem className="square border border-2, text-center">No placements available</ListGroupItem>;
    }

    return (
      <ListGroup className="text-center">
        {placements.length > 0 ? (
          placements.map((placement) => (
            <ListGroupItem key={placement.id} className="square border border-2">
              <p>Name: {placement.name}</p>
              <p>Finish Order: {placement.finishOrder}</p>
              {/* {placement.eventId && <p>Event ID: {placement.eventId}</p>} */}
              {/* <hr /> */}
              {isMainEditClicked && (
                <>
                  <Button onClick={() => openUpdateModal(placement)} className="me-4">
                    Update
                  </Button>
                  <Button color="danger" onClick={() => deletePlacement(placement.id)}>
                    Delete
                  </Button>
                </>
              )}
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>No placements available</ListGroupItem>
        )}
      </ListGroup>
    );
  };

  const renderPaginationItems = () => {
    const numButtonsToShow = 10;
    const halfNumButtons = Math.floor(numButtonsToShow / 2);

    let startPage = Math.max(currentPage - halfNumButtons, 1);
    let endPage = Math.min(startPage + numButtonsToShow - 1, totalPages);

    if (endPage - startPage < numButtonsToShow - 1) {
      startPage = Math.max(endPage - numButtonsToShow + 1, 1);
    }

    const paginationItems = [];
    for (let page = startPage; page <= endPage; page++) {
      paginationItems.push(
        <PaginationItem key={page} active={page === currentPage}>
          <PaginationLink onClick={() => handlePageChange(page)}>{page}</PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  return (
    <div>
      {renderPlacements()}

      <Pagination className="mt-4 justify-content-center">
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(currentPage - 1)} previous />
          </PaginationItem>
        )}

        {renderPaginationItems()}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(currentPage + 1)} next />
          </PaginationItem>
        )}
      </Pagination>

      <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
        <ModalHeader>Delete Placement</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this placement?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeletePlacement}>
            Delete
          </Button>{' '}
          <Button color="secondary" onClick={() => setIsModalOpen(!isModalOpen)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showUpdateForm} toggle={() => setShowUpdateForm(!showUpdateForm)}>
        <ModalHeader>Update Placement</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Name"
            value={updateFormName}
            onChange={(e) => setUpdateFormName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Finish Order"
            value={updateFormFinishOrder}
            onChange={(e) => setUpdateFormFinishOrder(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdatePlacement}>
            Update
          </Button>{' '}
          <Button color="secondary" onClick={() => setShowUpdateForm(!showUpdateForm)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export { PlacementPagedList };
