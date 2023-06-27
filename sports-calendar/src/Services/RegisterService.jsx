
const registerUser = (user) => {
  return http.post("/signup", user);
};

const RegisterService = {
  registerUser,
};
export default RegisterService;
