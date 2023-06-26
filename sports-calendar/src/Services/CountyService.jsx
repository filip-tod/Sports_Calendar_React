import http from "../http-common";

const getCountys = () => {
  return http.get("/County");
};

const getCounty = (id) => {
  return http.get(`/County/${id}`);
};

const createCounty = (county) => {
  return http.post("/County", county);
};

const updateCounty = (id, county) => {
  return http.put(`/County/${id}`, county);
};

const removeCounty = (id) => {
  return http.delete(`/County/${id}`);
};

const CountyService = {
  getCountys,
  getCounty,
  createCounty,
  updateCounty,
  removeCounty,
};

export default CountyService;
