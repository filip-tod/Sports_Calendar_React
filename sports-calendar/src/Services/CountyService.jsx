import api from "../http-common";

const getCounties = () => {
  return api.get("/County");
};

const createCounty = (county) => {
  return api.post("/County", county);
};

const updateCounty = (id, county) => {
  return api.put(`/County/${id}`, county);
};

const deleteCounty = (id) => {
  return api.delete(`/County/${id}`);
};

const fetchCountyById = (id) => {
  return api.get(`/County/${id}`);
};

const CountyService = {
  getCounties,
  createCounty,
  updateCounty,
  deleteCounty,
  fetchCountyById
};

export default CountyService;
