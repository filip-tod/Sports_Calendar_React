import http from "../http-common";

const getCitys = () => {
  return http.get("/City");
};

const fetchCityById = (id) => {
  return http.get(`/City/${id}`);
};

const deleteCity = (id) => {
  return http.delete(`/City/${id}`);
};

const createCity = (city) => {
  return http.post('/City/', city);
};

const updateCity = (id, city) => {
  return http.put(`/City/${id}`, city);
};

const CityService = {
  getCitys,
  fetchCityById,
  deleteCity,
  createCity,
  updateCity
};

export default CityService;
