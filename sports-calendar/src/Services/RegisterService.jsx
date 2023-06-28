import api from "../http-common";

const registerUser = (user) => {
  return api.post("/signup", user);
};

const RegisterService = {
  registerUser,
};
export default RegisterService;
