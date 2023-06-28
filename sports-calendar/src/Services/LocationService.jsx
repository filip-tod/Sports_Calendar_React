import api from "../http-common";

const getLocations = (pageNumber = 1, pageSize = 10, sortOrder = 'ASC', orderBy = 'Venue') => {
  return api.get("/Location", {
    params: {
      pageNumber,
      pageSize,
      sortOrder,
      orderBy
    }
  });
};

const createLocation = (location) => {
  return api.post("/Location", location);
};

const updateLocation = (id, location) => {
  return api.put(`/Location/${id}`, location);
};

const deleteLocation = (id) => {
  return api.delete(`/Location/${id}`);
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
