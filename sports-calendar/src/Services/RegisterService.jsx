import api from "../http-common";

const registerUser = (user) => {
  return api.post("/signup", user);
};

const logoutUser = () => {
  return api.get("/logout")
};

const RegisterService = {
  registerUser,
  logoutUser
};
export default RegisterService;
