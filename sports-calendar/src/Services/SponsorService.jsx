import http from "../http-common";

const getSponsors = () => {
  return http.get("/Sponsor");
};

const getSponsor = (id) => {
  return http.get(`/Sponsor/${id}`);
};

const createSponsor = (sponsor) => {
  return http.post("/Sponsor", sponsor);
};

const updateSponsor = (id, sponsor) => {
  return http.put(`/Sponsor/${id}`, sponsor);
};

const removeSponsor = (id) => {
  return http.delete(`/Sponsor/${id}`);
};

const SponsorService = {
  getSponsors,
  getSponsor,
  createSponsor,
  updateSponsor,
  removeSponsor
};

export default SponsorService;
