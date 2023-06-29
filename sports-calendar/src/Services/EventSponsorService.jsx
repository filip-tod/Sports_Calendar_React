import api from "../http-common";

const getSponsors = () => {
  return api.get("/EventSponsor");
};


const createEventSponsor = (event) => {
  return api.post("/EventSponsor", event);
};

const updateEventSponsor = (id, event) => {
  return api.put(`/EventSponsor/${id}`, event);
};

const removeEventSponsor = (id) => {
  return api.delete(`/EventSponsor/${id}`);
};

const EventSponsorService = {
    getSponsors,
  createEventSponsor,
  updateEventSponsor,
  removeEventSponsor
};

export default EventSponsorService;
