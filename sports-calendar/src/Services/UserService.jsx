import http from "../http-common";

const getUsers = () => {
  return http.get("/User");
};

const getUser = (id) => {
  return http.get(`/User/${id}`);
};

const createUser = (user) => {
  return http.post("/User", user);
};

const updateUser = (id, user) => {
  return http.put(`/User/${id}`, user);
};

const removeUser = (id) => {
  return http.delete(`/User/${id}`);
};

const UserService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};

export default UserService;
