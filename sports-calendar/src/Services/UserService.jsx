import api from "../http-common";

const getUsers = (pageNumber, pageSize) => {

  const number = pageNumber || 1;
  const size = pageSize || 10;
  return api.get("/User", {
    params: {
      pageNumber: number,
      pageSize: size
    }
  });
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
