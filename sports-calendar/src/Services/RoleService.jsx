import api from "../http-common";

const getRoles = () => {
  return api.get("/Role");
};

const RoleService = {
  getRoles,
};

export default RoleService;
