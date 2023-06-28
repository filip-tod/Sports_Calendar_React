import http from "../http-common";

const getLocations = (pageNumber = 1, pageSize = 10, sortOrder = 'ASC', orderBy = 'Venue') => {
  return http.get("/Location", {
    params: {
      pageNumber,
      pageSize,
      sortOrder,
      orderBy
    }
  });
};

const createLocation = (location) => {
  return http.post("/Location", location);
};

const updateLocation = (id, location) => {
  return http.put(`/Location/${id}`, location);
};

const deleteLocation = (id) => {
  return http.delete(`/Location/${id}`);
};

const fetchCityById = (id) => {
  return http.get(`/City/${id}`);
};

 

const LocationService = {
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    fetchCityById
};

export default LocationService;
