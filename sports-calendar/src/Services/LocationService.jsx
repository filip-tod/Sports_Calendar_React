import http from "../http-common";

const getLocations = () => {
  return http.get("/Location");
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

const CountyService = {
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation
};

export default CountyService;
