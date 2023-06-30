import api from "../http-common";

const getPlacements = (params) => {
  return api.get("/Placement", {params});
};

const getPlacement = (id) => {
  return api.get(`/Placement/${id}`);
};

const createPlacement = (placement) => {
  return api.post("/Placement", placement);
};

const updatePlacement = (id, placement) => {
  return api.put(`/Placement/${id}`, placement);
};

const removePlacement = (id) => {
  return api.delete(`/Placement/${id}`);
};

const PlacementService = {
  getPlacements,
  getPlacement,
  createPlacement,
  updatePlacement,
  removePlacement
};

export default PlacementService;
