import api from "../http-common";

const getEventSponsors = (params) => {
  return api.get("/EventSponsor", {params});
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
    getEventSponsors,
  createEventSponsor,
  updateEventSponsor,
  removeEventSponsor
};

export default EventSponsorService;
