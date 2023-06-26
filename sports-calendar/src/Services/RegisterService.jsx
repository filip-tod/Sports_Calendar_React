const registerUser = (user) => {
  return http.post("/Register", user);
};

const RegisterService = {
  registerUser,
};
export default RegisterService;
