import http from "../http-common";

const getCitys = () => {
  return http.get("/City");
};

const getCity = (id) => {
  return http.get(`/City/${id}`);
};

const createCity = (data) => {
  return http.post("/City", data);
};

const updateCity = (id, data) => {
  return http.put(`/City/${id}`, data);
};

const removeCity = (id) => {
  return http.delete(`/City/${id}`);
};

const CityService = {
  getCitys,
  getCity,
  createCity,
  updateCity,
  removeCity
};

export default CityService;
