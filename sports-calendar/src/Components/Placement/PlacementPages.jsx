import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import axios from 'axios';
import '../../Style/placementPages.css';

function PlacementPagedList({currentEventId}) {
  const [placements, setPlacements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [orderBy, setOrderBy] = useState('FinishOrder');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [pageSize, setPageSize] = useState(10);
  const [eventId, setEventId] = useState('');
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [updateFormName, setUpdateFormName] = useState('');
  const [updateFormFinishOrder, setUpdateFormFinishOrder] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const authToken = 'Bearer X0kQ0ebKAVSQ2aHG7MWzaORkbwJf9KGDHh_zTjgt6sACHBcaspWva6ZBmw_LHdYhMebHu4LA3uZjTYXXCanibQhh1kXb27uRomeHMiAsWGmm0ZmFL97GnlnNnJ2eeARKsR3eh6YTNDS4TKHbm5jLTNlz3GzXnmp8GhVPy9UdUskd8Y5iIBajZ-Jp1X0DKQ3q18Rt6fLIX8LTmE80uR1i-wE5ZO2xnMgw9QaWLBwQNMYqT9DX1NUX9F8ScIvZmoIcXGWpm89Ly6KkR39w4Bn--guzLNzy5VsRqVT0qoZ-kIZj49Tmftpk5q-lD6We1mAsszvmK-Zen8x2a-rk8WsM7MImL_12sKX1SH3Al7ArP0laGyWw_JJj6ZUcNWiLGDvG9PepTG8dYfvO-NCsEcy87w';


  const fetchPlacements = async (page) => {
    try {
      const response = await axios.get('https://localhost:44380/api/placement', {
        params: {
          orderBy,
          sortOrder,
          pageSize,
          pageNumber: page,
          eventId: currentEventId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
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
        const response = await axios.get('https://localhost:44380/api/placement', {
          params: {
            orderBy,
            sortOrder,
            pageSize,
            pageNumber: 1,
            eventId: currentEventId,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
          },
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
        await axios.delete(`https://localhost:44380/api/placement/${placementId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
          },
        });
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
      try {
        setUpdateFormName('');
        setUpdateFormFinishOrder('');
        setShowUpdateForm(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePlacementSelection = (placementId) => {
    setSelectedPlacement(placementId);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedPlacement) {
      const placementId = selectedPlacement;
      try {
        await axios.put(`https://localhost:44380/api/placement/${placementId}`, {
          name: updateFormName,
          finishOrder: updateFormFinishOrder,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
          },
        });

        console.log(`Placement with ID ${placementId} updated successfully.`);

        fetchPlacements(currentPage);
        setSelectedPlacement(null);
        setShowUpdateForm(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderPlacements = () => {
    return placements.map((placement) => (
      <div key={placement.id}>
        <label htmlFor="selectedPlacement">Edit</label><input
          type="checkbox"
          name="selectedPlacement"
          value={placement.id}
          checked={selectedPlacement === placement.id}
          onChange={() => handlePlacementSelection(placement.id)}
        />
        {/* <p>ID: {placement.id}</p> */}
        <p>Name: {placement.name}</p>
        <p>Finish Order: {placement.finishOrder}</p>
        { <p>Event ID: {placement.eventId}</p> }
        <hr />
      </div>
    ));
  };

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null;
    }

    let startPage = Math.max(currentPage - 5, 1);
    let endPage = Math.min(currentPage + 4, totalPages);

    if (currentPage <= 5) {
      endPage = Math.min(10, totalPages);
    }

    if (currentPage + 4 >= totalPages) {
      startPage = Math.max(totalPages - 9, 1);
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
      <Pagination aria-label="Placement pagination">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
        </PaginationItem>

        {pageNumbers.map((page) => (
          <PaginationItem active={currentPage === page} key={page}>
            <PaginationLink onClick={() => handlePageChange(page)}>{page}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationItem>
      </Pagination>
    );
  };

  return (
    <div className="placement-paged-list">
      <h1>Placement List</h1>
      <div className="filter-container">
        <label>Order By:</label>
        <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
          <option value="FinishOrder">Finish Order</option>
          <option value="Name">Name</option>
          <option value="EventId">Event ID</option>
        </select>
        <label>Sort Order:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="DESC">Descending</option>
          <option value="ASC">Ascending</option>
        </select>
        <button onClick={handleFilterConfirm}>Apply Filters</button>
      </div>
      <div className="action-buttons">
        <button onClick={handleDeletePlacement} disabled={!selectedPlacement}>
          Delete Placement
        </button>
        <button onClick={handleUpdatePlacement} disabled={!selectedPlacement}>
          Update Placement
        </button>
      </div>
      {showUpdateForm && (
        <div className="update-form">
          <h2>Update Placement</h2>
          <form onSubmit={handleUpdateFormSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={updateFormName}
                onChange={(e) => setUpdateFormName(e.target.value)}
              />
            </div>
            <div>
              <label>Finish Order:</label>
              <input
                type="text"
                value={updateFormFinishOrder}
                onChange={(e) => setUpdateFormFinishOrder(e.target.value)}
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
      <div className="placement-container">{renderPlacements()}</div>
      {renderPagination()}
    </div>
  );
}

export default PlacementPagedList;
