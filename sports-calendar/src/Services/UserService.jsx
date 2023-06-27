import api from "../http-common";

const getUsers = () => {
  return api.get("/User");
};

const getUser = (id) => {
  return api.get(`/User/${id}`);
};

const updateUser = (id, user) => {
  return api.put(`/User/${id}`, user);
};

const removeUser = (id) => {
  return api.delete(`/User/${id}`);
};

const UserService = {
  getUsers,
  getUser,
  updateUser,
  removeUser,
};

export default UserService;
