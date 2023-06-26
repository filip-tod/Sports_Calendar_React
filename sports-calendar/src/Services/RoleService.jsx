const getRoles = () => {
  return http.get("/Role");
};

const RoleService = {
  getRoles,
};

export default RoleService;
