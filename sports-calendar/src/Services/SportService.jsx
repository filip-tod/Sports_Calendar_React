import http from "../http-common";

const getSports = () => {
  return http.get("/Sport");
};

const getSport = (id) => {
  return http.get(`/Sport/${id}`);
};

const createSport = (sport) => {
  return http.post("/Sport", sport);
};

const updateSport = (id, sport) => {
  return http.put(`/Sport/${id}`, sport);
};

const removeSport = (id) => {
  return http.delete(`/Sport/${id}`);
};

const SportService = {
  getSports,
  getSport,
  createSport,
  updateSport,
  removeSport
};

export default SportService;
