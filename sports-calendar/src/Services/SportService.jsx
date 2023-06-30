import api from "../http-common";

const getSports = () => {
  return api.get("/Sport");
};

const getSport = (id) => {
  return api.get(`/Sport/${id}`);
};

const createSport = (sport) => {
  return api.post("/Sport", sport);
};

const updateSport = (id, sport) => {
  return api.put(`/Sport/${id}`, sport);
};

const removeSport = (id) => {
  return api.delete(`/Sport/${id}`);
};

const SportService = {
  getSports,
  getSport,
  createSport,
  updateSport,
  removeSport
};

export default SportService;
