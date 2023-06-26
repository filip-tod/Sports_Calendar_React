import http from "../http-common";

const getEvents = () => {
  return http.get("/Event");
};

const getEvent = (id) => {
  return http.get(`/Event/${id}`);
};

const createEvent = (event) => {
  return http.post("/Event", event);
};

const updateEvent = (id, event) => {
  return http.put(`/Event/${id}`, event);
};

const removeEvent = (id) => {
  return http.delete(`/Event/${id}`);
};

const EventService = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  removeEvent
};

export default EventService;
