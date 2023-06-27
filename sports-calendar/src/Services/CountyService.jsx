import http from "../http-common";

const getCounties = () => {
  return http.get("/County");
};

const createCounty = (county) => {
  return http.post("/County", county);
};

const updateCounty = (id, county) => {
  return http.put(`/County/${id}`, county);
};

const deleteCounty = (id) => {
  return http.delete(`/County/${id}`);
};

const fetchCountyById = (id) => {
  return http.get(`/County/${id}`);
};

const CountyService = {
  getCounties,
  createCounty,
  updateCounty,
  deleteCounty,
  fetchCountyById
};

export default CountyService;
