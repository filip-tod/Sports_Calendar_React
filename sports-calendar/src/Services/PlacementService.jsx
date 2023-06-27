import http from "../http-common";

const getPlacements = () => {
  return http.get("/Placement");
};

const getPlacement = (id) => {
  return http.get(`/Placement/${id}`);
};

const createPlacement = (placement) => {
  return http.post("/Placement", placement);
};

const updatePlacement = (id, placement) => {
  return http.put(`/Placement/${id}`, placement);
};

const removePlacement = (id) => {
  return http.delete(`/Placement/${id}`);
};

const PlacementService = {
  getPlacements,
  getPlacement,
  createPlacement,
  updatePlacement,
  removePlacement
};

export default PlacementService;
