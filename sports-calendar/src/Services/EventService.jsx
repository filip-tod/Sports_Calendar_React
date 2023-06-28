import api from "../http-common";

const getEvents = () => {
  return api.get("/Event");
};

const getEvent = (id) => {
  return api.get(`/Event/${id}`);
};

const createEvent = (event) => {
  return api.post("/Event", event);
};

const updateEvent = (id, event) => {
  return api.put(`/Event/${id}`, event);
};

const removeEvent = (id) => {
  return api.delete(`/Event/${id}`);
};

const EventService = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  removeEvent
};

export default EventService;
