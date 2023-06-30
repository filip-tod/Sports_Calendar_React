import api from "../http-common";

const getCitys = () => {
  return api.get("/City");
};

const fetchCityById = (id) => {
  return api.get(`/City/${id}`);
};

const deleteCity = (id) => {
  return api.delete(`/City/${id}`);
};

const createCity = (city) => {
  return api.post('/City/', city);
};

const updateCity = (id, city) => {
  return api.put(`/City/${id}`, city);
};

const CityService = {
  getCitys,
  fetchCityById,
  deleteCity,
  createCity,
  updateCity
};

export default CityService;
