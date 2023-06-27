import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import axios from 'axios';
import "../../Style/placementPages.css";

function PlacementPagedList() {
  const [placements, setPlacements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [orderBy, setOrderBy] = useState('FinishOrder');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [pageSize, setPageSize] = useState(10);
  const [eventId, setEventId] = useState(null);
  const [filtersChanged, setFiltersChanged] = useState(false);

  const fetchPlacements = async () => {
    try {
      const response = await axios.get('https://localhost:44380/api/placement', {
      params: {
        orderBy,
        sortOrder,
        pageSize,
        pageNumber: 1,
        eventId,
      },
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer A0Rd575vvOP_cEqGDs4gIsvQO39lhkSrJ-8AEmyKbu9obbSxQ7zmqaaR_ayMTIA7JG67TYGLXBuxi8sPzo8r3O-OBCywJ-OSb_krkyLg94YRLbrFvfMWqlBCV-6qlt501qYmJb5iwuIxgTYfAhEFtjfDuysq-5SqKFzjqOiQQYPJJGqbdXLwpR1hVQ1DXxtQcRT_2LFWJfDNaRk08cYf5IfUkBpvhpV216MbvjKQwx_9z_xw7O8LT8PdJMol3vKcZ8WbGY74508N_jvB8jHoSX8P_6WGexYyPoapkqWCEQyxMYchVDrPqcxcyHU2G-SoIfZucLEVIvp2CSSho2wDlo9jkgUObgLvcpzteHYbTOfIvM2cBOd3GKkTtmzfdPEh',
        },
      });

      const responseData = response.data;
      const placementsData = Array.isArray(responseData) ? responseData : responseData.data;

      setPlacements(placementsData);
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
            eventId,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer A0Rd575vvOP_cEqGDs4gIsvQO39lhkSrJ-8AEmyKbu9obbSxQ7zmqaaR_ayMTIA7JG67TYGLXBuxi8sPzo8r3O-OBCywJ-OSb_krkyLg94YRLbrFvfMWqlBCV-6qlt501qYmJb5iwuIxgTYfAhEFtjfDuysq-5SqKFzjqOiQQYPJJGqbdXLwpR1hVQ1DXxtQcRT_2LFWJfDNaRk08cYf5IfUkBpvhpV216MbvjKQwx_9z_xw7O8LT8PdJMol3vKcZ8WbGY74508N_jvB8jHoSX8P_6WGexYyPoapkqWCEQyxMYchVDrPqcxcyHU2G-SoIfZucLEVIvp2CSSho2wDlo9jkgUObgLvcpzteHYbTOfIvM2cBOd3GKkTtmzfdPEh',
          },
        });

        const responseData = response.data;
        const placementsData = Array.isArray(responseData) ? responseData : responseData.data;

        setPlacements(placementsData);
        setTotalPages(Math.ceil(placementsData.length / pageSize));

        fetchPlacements(1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialPlacements();
  }, []);

  useEffect(() => {
    // Calculate the total number of pages based on the placements and page size
    const totalPages = Math.ceil(placements.length / pageSize);
    setTotalPages(totalPages);

    // Reset current page if it exceeds the new total pages
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [placements, pageSize]);

  useEffect(() => {
    if (filtersChanged) {
      fetchPlacements();
      setFiltersChanged(false);
    }
  }, [currentPage, filtersChanged]);

  const handlePageChange = (page) => {
    // Ensure the page number is greater than 0
    if (page > 0) {
      fetchPlacements(page);
    }
  };

  const handleFilterConfirm = () => {
    setFiltersChanged(true);
  };

  const renderPlacements = () => {
    return placements.map((placement) => (
      <div key={placement.id}>
        <p>ID: {placement.id}</p>
        <p>Name: {placement.name}</p>
        <p>Finish Order: {placement.finishOrder}</p>
        <p>Event ID: {placement.eventId}</p>
        <hr />
      </div>
    ));
  };

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null;
    }
  
    const maxPageButtons = 10; // Maximum number of page buttons to display
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
  
    // Adjust startPage if there are not enough pages after endPage
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
  
    const paginationItems = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <PaginationItem key={i} active={i === currentPage}>
          <PaginationLink onClick={() => handlePageChange(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
  
    return (
      <Pagination>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
        </PaginationItem>
        {paginationItems}
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(1)}>First</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(totalPages)}>Last</PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  };


  return (
    <div className="placement-paged-list">
      <div className="placement-list">
        {renderPlacements()}
      </div>
      <div className="pagination-container">
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
          <label>Page Size:</label>
          <select value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
          </select>
          <button onClick={handleFilterConfirm}>Apply Filters</button>
        </div>
        {renderPagination()}
      </div>
    </div>
  );
}

export default PlacementPagedList;
