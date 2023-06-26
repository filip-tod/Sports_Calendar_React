import http from "../http-common";

const getLocations = () => {
  return http.get("/Location");
};

const getLocation = (id) => {
  return http.get(`/Location/${id}`);
};

const createLocation = (location) => {
  return http.post("/Location", location);
};

const updateLocation = (id, location) => {
  return http.put(`/Location/${id}`, location);
};

const removeLocation = (id) => {
  return http.delete(`/Location/${id}`);
};

const LocationService = {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  removeLocation
};

export default LocationService;
