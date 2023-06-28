import api from "../http-common";

const getSponsors = () => {
  return api.get("/Sponsor");
};

const getSponsor = (id) => {
  return api.get(`/Sponsor/${id}`);
};

const createSponsor = (sponsor) => {
  return api.post("/Sponsor", sponsor);
};

const updateSponsor = (id, sponsor) => {
  return api.put(`/Sponsor/${id}`, sponsor);
};

const removeSponsor = (id) => {
  return api.delete(`/Sponsor/${id}`);
};

const SponsorService = {
  getSponsors,
  getSponsor,
  createSponsor,
  updateSponsor,
  removeSponsor
};

export default SponsorService;
